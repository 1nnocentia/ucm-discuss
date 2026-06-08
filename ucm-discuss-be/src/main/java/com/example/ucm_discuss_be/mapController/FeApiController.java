package com.example.ucm_discuss_be.mapController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.ucm_discuss_be.cloudinary.CloudinaryUploadService;
import com.example.ucm_discuss_be.comments.CommentModel;
import com.example.ucm_discuss_be.comments.CommentRepository;
import com.example.ucm_discuss_be.comments.CommentService;
import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.exceptions.ResourceNotFoundException;
import com.example.ucm_discuss_be.notifications.NotificationModel;
import com.example.ucm_discuss_be.notifications.NotificationRepository;
import com.example.ucm_discuss_be.notifications.NotificationService;
import com.example.ucm_discuss_be.replies.ReplyModel;
import com.example.ucm_discuss_be.replies.ReplyRepository;
import com.example.ucm_discuss_be.security.auth.AuthService;
import com.example.ucm_discuss_be.security.auth.LoginRequestDto;
import com.example.ucm_discuss_be.aiInteraction.AiInteractionModel;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.threads.ThreadRepository;
import com.example.ucm_discuss_be.threads.ThreadService;
import com.example.ucm_discuss_be.userVotesComment.UserVotesCommentRepository;
import com.example.ucm_discuss_be.userVotesThread.UserVotesThreadRepository;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserProfileDto;
import com.example.ucm_discuss_be.users.UserRepository;
import com.example.ucm_discuss_be.users.UserService;

@RestController
public class FeApiController {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("d MMM yyyy",
            Locale.forLanguageTag("id-ID"));
    private static final String DEFAULT_DEV_EMAIL = "haninno@student.ciputra.ac.id";

    @Autowired
    private AuthService authService;

    @Autowired
    private ThreadService threadService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserService userService;

    @Autowired
    private CloudinaryUploadService cloudinaryUploadService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserVotesThreadRepository userVotesThreadRepository;

    @Autowired
    private UserVotesCommentRepository userVotesCommentRepository;

    @PostMapping({ "/auth/login", "/api/auth/login" })
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequestDto request) {
        var response = authService.login(request);
        Map<String, Object> user = new LinkedHashMap<>();
        user.put("id", response.getData().getUser().getId().toString());
        user.put("email", response.getData().getUser().getEmail());
        user.put("isStudent", response.getData().getUser().getIsStudent());
        user.put("nim", response.getData().getUser().getNimOrNisn());
        user.put("name", response.getData().getUser().getName());

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("token", response.getData().getToken());
        payload.put("user", user);
        return ResponseEntity.ok(payload);
    }

    @PostMapping({ "/auth/demo-login", "/api/auth/demo-login" })
    public ResponseEntity<Map<String, Object>> demoLogin(@RequestBody LoginRequestDto request) {
        var response = authService.demoLogin(request.getEmail());
        Map<String, Object> user = new LinkedHashMap<>();
        user.put("id", response.getData().getUser().getId().toString());
        user.put("email", response.getData().getUser().getEmail());
        user.put("isStudent", response.getData().getUser().getIsStudent());
        user.put("nim", response.getData().getUser().getNimOrNisn());
        user.put("name", response.getData().getUser().getName());

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("token", response.getData().getToken());
        payload.put("user", user);
        return ResponseEntity.ok(payload);
    }

    @PostMapping({ "/auth/logout", "/api/auth/logout" })
    public ResponseEntity<Map<String, Object>> logout() {
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping({ "/posts", "/api/posts" })
    public ResponseEntity<List<Map<String, Object>>> getPosts(@RequestParam(defaultValue = "1") int page) {
        int pageIndex = Math.max(0, page - 1);
        UserModel currentUser = resolveCurrentUser().orElse(null);
        List<ThreadModel> threads = threadRepository.findAll(
                PageRequest.of(pageIndex, 10, Sort.by(Sort.Direction.DESC, "createdAt")))
                .getContent();
        return ResponseEntity.ok(threads.stream()
                .map(thread -> buildPost(thread, currentUser))
                .toList());
    }

    @GetMapping({ "/posts/{postId}", "/api/posts/{postId}" })
    public ResponseEntity<Map<String, Object>> getPostDetail(
            @org.springframework.web.bind.annotation.PathVariable Long postId) {
        ThreadModel thread = threadRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Thread", postId));
        return ResponseEntity.ok(buildPost(thread, resolveCurrentUser().orElse(null)));
    }

    @PostMapping(value = { "/posts", "/api/posts" }, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> createPost(
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam String topicId,
            @RequestParam(name = "isAnonymous") boolean isAnonymous,
            @RequestParam(required = false) String aiInteraction,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "userId", required = false) Long userId) throws Exception {

        UserModel user = resolveUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", 1L));
        Long courseId = parseId(topicId);
        String imageUrl = uploadIfNeeded(image);

        var dto = new com.example.ucm_discuss_be.threads.ThreadCreationDto();
        dto.setTitle(title);
        dto.setContent(description == null || description.isBlank() ? title : description);
        dto.setIs_anon(isAnonymous);
        dto.setUserId(user.getId());
        dto.setCourseId(courseId);
        dto.setImage(imageUrl);

        ThreadModel created = threadService.saveThread(dto);

        if (aiInteraction != null && !aiInteraction.isBlank()) {
            try {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                Map<String, Object> aiMap = mapper.readValue(aiInteraction, Map.class);
                String question = (String) aiMap.get("question");
                String answer = (String) aiMap.get("answer");
                if (question != null && !question.isBlank()) {
                    AiInteractionModel interaction = new AiInteractionModel();
                    interaction.setThreadId(created.getId());
                    interaction.setQuestion(question);
                    interaction.setAnswer(answer);

                    created.setAiInteraction(interaction);
                    interaction.setThread(created);

                    threadRepository.save(created);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(buildPost(created, user));
    }

    @GetMapping({ "/users/{userId}/posts", "/api/users/{userId}/posts" })
    public ResponseEntity<List<Map<String, Object>>> getUserPosts(
            @org.springframework.web.bind.annotation.PathVariable Long userId) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        List<Map<String, Object>> posts = threadRepository.findByUserId(userId).stream()
                .map(thread -> buildPost(thread, user))
                .toList();
        return ResponseEntity.ok(posts);
    }

    @GetMapping({ "/posts/{postId}/comments", "/api/posts/{postId}/comments" })
    public ResponseEntity<List<Map<String, Object>>> getComments(
            @org.springframework.web.bind.annotation.PathVariable Long postId) {
        return ResponseEntity.ok(buildCommentTree(postId, resolveCurrentUser().orElse(null)));
    }

    @PostMapping(value = { "/comments", "/api/comments" }, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> createComment(
            @RequestParam String postId,
            @RequestParam(required = false) String parentCommentId,
            @RequestParam String content,
            @RequestParam(name = "isAnonymous") boolean isAnonymous,
            @RequestParam(required = false) Boolean askedAi,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "userId", required = false) Long userId) throws Exception {

        UserModel user = resolveUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", 1L));
        Long threadId = parseId(postId);
        String imageUrl = uploadIfNeeded(image);

        var dto = new com.example.ucm_discuss_be.comments.CommentCreationDto();
        dto.setThreadId(threadId);
        dto.setUserId(user.getId());
        dto.setContent(content);
        dto.setIs_anon(isAnonymous);
        dto.setAskedAi(askedAi != null ? askedAi : false);
        dto.setImage(imageUrl);

        CommentModel created = commentService.saveComment(dto);

        if (parentCommentId != null && !parentCommentId.isBlank()) {
            CommentModel parent = commentRepository.findById(parseId(parentCommentId))
                    .orElseThrow(() -> new ResourceNotFoundException("Comment", parseId(parentCommentId)));
            ReplyModel reply = new ReplyModel();
            reply.setParent_comment(parent);
            reply.setReply_comment(created);
            replyRepository.save(reply);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(buildComment(created, resolveCurrentUser().orElse(user)));
    }

    @GetMapping({ "/users/{userId}/comments", "/api/users/{userId}/comments" })
    public ResponseEntity<List<Map<String, Object>>> getUserComments(
            @org.springframework.web.bind.annotation.PathVariable Long userId) {
        UserModel currentUser = resolveCurrentUser().orElse(null);
        return ResponseEntity.ok(commentRepository.findByUserId(userId).stream()
                .filter(comment -> !isReplyComment(comment.getId()))
                .map(comment -> buildComment(comment, currentUser))
                .toList());
    }

    @PostMapping({ "/posts/{postId}/vote", "/api/posts/{postId}/vote" })
    public ResponseEntity<Map<String, Object>> votePost(
            @org.springframework.web.bind.annotation.PathVariable Long postId,
            @RequestBody(required = false) Map<String, Boolean> body) {
        boolean desired = body == null || body.getOrDefault("isVoted", true);
        UserModel user = resolveCurrentUser().orElseThrow(() -> new ResourceNotFoundException("User", 1L));
        boolean alreadyVoted = userVotesThreadRepository.findByUserIdAndThreadId(user.getId(), postId).isPresent();

        if (desired && !alreadyVoted) {
            threadService.upvoteThread(postId, user.getEmail());
        } else if (!desired && alreadyVoted) {
            threadService.removeVote(postId, user.getEmail());
        }

        ThreadModel thread = threadRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Thread", postId));
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("isVoted", userVotesThreadRepository.findByUserIdAndThreadId(user.getId(), postId).isPresent());
        response.put("post", buildPost(thread, user));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping({ "/posts/{postId}/vote", "/api/posts/{postId}/vote" })
    public ResponseEntity<Map<String, Object>> unvotePost(
            @org.springframework.web.bind.annotation.PathVariable Long postId) {
        return votePost(postId, Map.of("isVoted", false));
    }

    @PostMapping({ "/comments/{commentId}/vote", "/api/comments/{commentId}/vote" })
    public ResponseEntity<Map<String, Object>> voteComment(
            @org.springframework.web.bind.annotation.PathVariable Long commentId,
            @RequestBody(required = false) Map<String, Boolean> body) {
        boolean desired = body == null || body.getOrDefault("isVoted", true);
        UserModel user = resolveCurrentUser().orElseThrow(() -> new ResourceNotFoundException("User", 1L));
        boolean alreadyVoted = userVotesCommentRepository.findByUserIdAndCommentId(user.getId(), commentId).isPresent();

        if (desired && !alreadyVoted) {
            commentService.upvoteComment(commentId, user.getEmail());
        } else if (!desired && alreadyVoted) {
            commentService.removeVote(commentId, user.getEmail());
        }

        CommentModel comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", commentId));
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("isVoted",
                userVotesCommentRepository.findByUserIdAndCommentId(user.getId(), commentId).isPresent());
        response.put("comment", buildComment(comment, user));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping({ "/comments/{commentId}/vote", "/api/comments/{commentId}/vote" })
    public ResponseEntity<Map<String, Object>> unvoteComment(
            @org.springframework.web.bind.annotation.PathVariable Long commentId) {
        return voteComment(commentId, Map.of("isVoted", false));
    }

    @GetMapping({ "/topics", "/api/topics" })
    public ResponseEntity<List<Map<String, Object>>> getTopics() {
        List<Map<String, Object>> topics = topicDefinitions().values().stream()
                .map(course -> {
                    Map<String, Object> topic = new LinkedHashMap<>();
                    topic.put("id", course.getId().toString());
                    topic.put("name", course.getCourse_name());
                    topic.put("description", topicDescription(course.getCourse_code()));
                    topic.put("status", topicStatus(course.getCourse_code()));
                    topic.put("discussionCount",
                            threadRepository.findByCourseId(course.getId(), PageRequest.of(0, 1)).getTotalElements());
                    return topic;
                })
                .toList();
        return ResponseEntity.ok(topics);
    }

    @GetMapping({ "/notifications", "/api/notifications" })
    public ResponseEntity<List<Map<String, Object>>> getNotifications() {
        UserModel user = resolveCurrentUser().orElseThrow(() -> new ResourceNotFoundException("User", 1L));
        List<Map<String, Object>> payload = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(notification -> buildNotification(notification, user))
                .toList();
        return ResponseEntity.ok(payload);
    }

    @GetMapping({ "/notifications/unread-count", "/api/notifications/unread-count" })
    public ResponseEntity<Map<String, Object>> getUnreadCount() {
        UserModel user = resolveCurrentUser().orElseThrow(() -> new ResourceNotFoundException("User", 1L));
        long count = notificationService.getUnreadCount(user.getId());
        return ResponseEntity.ok(Map.of("count", count));
    }

    @PatchMapping({ "/notifications/{notificationId}/read", "/api/notifications/{notificationId}/read" })
    public ResponseEntity<Map<String, Object>> markNotificationAsRead(
            @org.springframework.web.bind.annotation.PathVariable Long notificationId) {
        UserModel user = resolveCurrentUser().orElseThrow(() -> new ResourceNotFoundException("User", 1L));
        notificationService.markAsRead(notificationId, user.getId());
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping({ "/me/profile", "/api/users/me/profile" })
    public ResponseEntity<UserProfileDto> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        UserModel user = resolveAuthenticatedUser(userDetails)
                .orElseGet(() -> resolveCurrentUser().orElseThrow(() -> new ResourceNotFoundException("User", 1L)));
        return ResponseEntity.ok(userService.getUserByEmail(user.getEmail()));
    }

    @PatchMapping({ "/me/anonymous-status", "/api/users/me/anonymous-status" })
    public ResponseEntity<Map<String, Object>> setAnonymous(@AuthenticationPrincipal UserDetails userDetails) {
        UserModel user = resolveAuthenticatedUser(userDetails)
                .orElseGet(() -> resolveCurrentUser().orElseThrow(() -> new ResourceNotFoundException("User", 1L)));
        user.setIsAnon(!Boolean.TRUE.equals(user.getIsAnon()));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping({ "/me/history", "/api/users/me/history", "/api/users/me/viewed-threads" })
    public ResponseEntity<List<Map<String, Object>>> getMyHistory(@AuthenticationPrincipal UserDetails userDetails) {
        UserModel user = resolveAuthenticatedUser(userDetails)
                .orElseGet(() -> resolveCurrentUser().orElseThrow(() -> new ResourceNotFoundException("User", 1L)));

        List<Map<String, Object>> history = new ArrayList<>();

        threadRepository.findByUserId(user.getId()).forEach(thread -> {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("type", "post");
            item.put("id", thread.getId().toString());
            item.put("title", thread.getTitle());
            item.put("createdAt", formatDate(thread.getCreatedAt()));
            item.put("votesCount", thread.getVote_count());
            item.put("commentCount", commentRepository.findByThreadId(thread.getId()).size());
            history.add(item);
        });

        commentRepository.findByUserId(user.getId()).forEach(comment -> {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("type", "comment");
            item.put("id", comment.getId().toString());
            item.put("postId", comment.getThread().getId().toString());
            item.put("content", comment.getContent());
            item.put("parentPostTitle", comment.getThread().getTitle());
            item.put("createdAt", formatDate(comment.getCreated_at()));
            item.put("votesCount", comment.getVote_count());
            item.put("commentCount", 0);
            history.add(item);
        });

        history.sort(
                Comparator.comparing((Map<String, Object> item) -> String.valueOf(item.get("createdAt"))).reversed());
        return ResponseEntity.ok(history);
    }

    @GetMapping({ "/search", "/api/search" })
    public ResponseEntity<Map<String, Object>> search(@RequestParam("q") String query) {
        String normalized = query == null ? "" : query.trim().toLowerCase(Locale.ROOT);

        List<Map<String, Object>> posts = threadRepository.findAll().stream()
                .filter(thread -> contains(thread.getTitle(), normalized) || contains(thread.getContent(), normalized))
                .map(thread -> buildPost(thread, resolveCurrentUser().orElse(null)))
                .toList();

        List<Map<String, Object>> comments = commentRepository.findAll().stream()
                .filter(comment -> contains(comment.getContent(), normalized))
                .filter(comment -> !isReplyComment(comment.getId()))
                .map(comment -> buildComment(comment, resolveCurrentUser().orElse(null)))
                .toList();

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("posts", posts);
        response.put("comments", comments);
        return ResponseEntity.ok(response);
    }

    private Map<String, Object> buildPost(ThreadModel thread, UserModel currentUser) {
        Map<String, Object> post = new LinkedHashMap<>();
        post.put("id", thread.getId().toString());
        post.put("title", thread.getTitle());
        post.put("description", thread.getContent());
        post.put("image", thread.getImage());
        post.put("createdAt", formatDate(thread.getCreatedAt()));
        post.put("votes", thread.getVote_count());
        post.put("comments", commentRepository.findByThreadId(thread.getId()).size());

        Map<String, Object> topic = new LinkedHashMap<>();
        topic.put("id", thread.getCourse().getId().toString());
        topic.put("name", thread.getCourse().getCourse_name());
        post.put("topic", topic);

        Map<String, Object> user = new LinkedHashMap<>();
        boolean anonymous = Boolean.TRUE.equals(thread.getIs_anon());
        user.put("id", thread.getUser().getId().toString());
        user.put("name", anonymous ? "Anonymous" : thread.getUser().getName());
        user.put("isAnonymous", anonymous);
        post.put("user", user);

        boolean voted = currentUser != null
                && userVotesThreadRepository.findByUserIdAndThreadId(currentUser.getId(), thread.getId()).isPresent();
        post.put("userVoteStatus", voted);

        if (thread.getAiInteraction() != null) {
            Map<String, Object> aiMap = new LinkedHashMap<>();
            Map<String, Object> actorMap = new LinkedHashMap<>();
            actorMap.put("id", thread.getUser().getId().toString());
            actorMap.put("name", anonymous ? "Anonymous" : thread.getUser().getName());
            actorMap.put("isAnonymous", anonymous);

            aiMap.put("actorName", actorMap);
            aiMap.put("question", thread.getAiInteraction().getQuestion());
            aiMap.put("answer", thread.getAiInteraction().getAnswer());
            aiMap.put("isGenerating", false);
            post.put("aiInteraction", aiMap);
        } else {
            post.put("aiInteraction", null);
        }

        return post;
    }

    private Map<String, Object> buildComment(CommentModel comment, UserModel currentUser) {
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("id", comment.getId().toString());
        payload.put("postId", comment.getThread().getId().toString());

        Optional<ReplyModel> parentReply = replyRepository.findAll().stream()
                .filter(reply -> reply.getReply_comment() != null
                        && reply.getReply_comment().getId().equals(comment.getId()))
                .findFirst();
        payload.put("parentPostId",
                parentReply.map(reply -> reply.getParent_comment().getId().toString()).orElse(null));

        payload.put("content", comment.getContent());
        payload.put("image", comment.getImage());
        payload.put("createdAt", formatDate(comment.getCreated_at()));
        payload.put("votes", comment.getVote_count());

        Map<String, Object> user = new LinkedHashMap<>();
        boolean anonymous = Boolean.TRUE.equals(comment.getIs_anon());
        user.put("id", comment.getUser().getId().toString());
        user.put("name", anonymous ? "Anonymous" : comment.getUser().getName());
        user.put("isAnonymous", anonymous);
        payload.put("user", user);

        boolean voted = currentUser != null && userVotesCommentRepository
                .findByUserIdAndCommentId(currentUser.getId(), comment.getId()).isPresent();
        payload.put("userVoteStatus", voted);

        List<Map<String, Object>> replies = replyRepository.findByParentCommentId(comment.getId()).stream()
                .map(reply -> buildComment(reply.getReply_comment(), currentUser))
                .toList();
        payload.put("replies", replies);

        if (Boolean.TRUE.equals(comment.getAsked_ai())) {
            Map<String, Object> aiMap = new LinkedHashMap<>();
            Map<String, Object> actorMap = new LinkedHashMap<>();
            actorMap.put("id", comment.getUser().getId().toString());
            actorMap.put("name", anonymous ? "Anonymous" : comment.getUser().getName());
            actorMap.put("isAnonymous", anonymous);

            aiMap.put("actorName", actorMap);
            aiMap.put("question", "Ask AI");
            aiMap.put("answer", comment.getContent());
            aiMap.put("isGenerating", false);
            payload.put("aiInteraction", aiMap);
        } else {
            payload.put("aiInteraction", null);
        }
        return payload;
    }

    private List<Map<String, Object>> buildCommentTree(Long postId, UserModel currentUser) {
        List<CommentModel> comments = commentRepository.findByThreadId(postId);
        Set<Long> replyCommentIds = replyRepository.findAll().stream()
                .map(reply -> reply.getReply_comment().getId())
                .collect(Collectors.toSet());

        return comments.stream()
                .filter(comment -> !replyCommentIds.contains(comment.getId()))
                .map(comment -> buildComment(comment, currentUser))
                .toList();
    }

    private Map<String, Object> buildNotification(NotificationModel notification, UserModel currentUser) {
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("id", notification.getId().toString());

        CommentModel comment = notification.getComment();
        boolean isReply = replyRepository.findByReplyCommentId(comment.getId()).isPresent();
        payload.put("actionType", isReply ? "reply_comment" : "reply_post");
        payload.put("commentId", isReply ? comment.getId().toString() : null);
        payload.put("postId", comment.getThread().getId().toString());
        payload.put("targetSnippet", truncate(comment.getThread().getTitle(), 48));
        payload.put("createdAt", formatDate(notification.getCreated_at()));
        payload.put("isRead", notification.getIs_read());
        payload.put("actorName", Boolean.TRUE.equals(comment.getIs_anon()) ? "Anonymous" : comment.getUser().getName());
        return payload;
    }

    private Map<String, CourseModel> topicDefinitions() {
        return threadRepository.findAll().stream()
                .map(ThreadModel::getCourse)
                .distinct()
                .collect(Collectors.toMap(course -> course.getCourse_code(), course -> course, (left, right) -> left,
                        LinkedHashMap::new));
    }

    private String topicDescription(String courseCode) {
        return switch (courseCode) {
            case "AI101" -> "Discussions on ML, Neural Networks, and GenAI implementations.";
            case "MD101" -> "React Native, Flutter, and native Android/iOS challenges.";
            case "DB101" -> "SQL queries, relational algebra, and NoSQL architecture.";
            case "AD101" -> "Competitive programming, big-O notation, and DP.";
            case "SE101" -> "Clean Architecture, SDLC, and Agile methodologies.";
            case "CS101" -> "Penetration testing, cryptography, and network security.";
            default -> "";
        };
    }

    private String topicStatus(String courseCode) {
        return switch (courseCode) {
            case "DB101", "AD101" -> "past";
            default -> "current";
        };
    }

    private Optional<UserModel> resolveCurrentUser() {
        org.springframework.security.core.Authentication authentication = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() &&
                !(authentication instanceof org.springframework.security.authentication.AnonymousAuthenticationToken)) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                return userRepository.findByEmail(((UserDetails) principal).getUsername());
            }
        }
        return userRepository.findByEmail(DEFAULT_DEV_EMAIL)
                .or(() -> userRepository.findAll().stream().findFirst());
    }

    private Optional<UserModel> resolveAuthenticatedUser(UserDetails userDetails) {
        if (userDetails != null) {
            return userRepository.findByEmail(userDetails.getUsername());
        }
        return Optional.empty();
    }

    private Optional<UserModel> resolveUser(Long userId) {
        if (userId != null) {
            return userRepository.findById(userId);
        }
        return resolveCurrentUser();
    }

    private Long parseId(String value) {
        try {
            return Long.parseLong(value);
        } catch (NumberFormatException ex) {
            throw new IllegalArgumentException("Invalid id: " + value, ex);
        }
    }

    private boolean contains(String source, String query) {
        return source != null && source.toLowerCase(Locale.ROOT).contains(query);
    }

    private boolean isReplyComment(Long commentId) {
        return replyRepository.findByReplyCommentId(commentId).isPresent();
    }

    private String formatDate(LocalDateTime time) {
        return time == null ? null : time.toLocalDate().format(DATE_FORMATTER);
    }

    private String truncate(String value, int length) {
        if (value == null || value.length() <= length) {
            return value;
        }
        return value.substring(0, Math.max(0, length - 3)) + "...";
    }

    private String uploadIfNeeded(MultipartFile image) throws Exception {
        if (image == null || image.isEmpty()) {
            return null;
        }
        return cloudinaryUploadService.uploadImage(image);
    }
}