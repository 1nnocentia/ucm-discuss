package com.example.ucm_discuss_be.seeders;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.example.ucm_discuss_be.comments.CommentModel;
import com.example.ucm_discuss_be.comments.CommentRepository;
import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.courses.CourseRepository;
import com.example.ucm_discuss_be.faculties.FacultyModel;
import com.example.ucm_discuss_be.faculties.FacultyRepository;
import com.example.ucm_discuss_be.majors.MajorModel;
import com.example.ucm_discuss_be.majors.MajorRepository;
import com.example.ucm_discuss_be.notifications.NotificationModel;
import com.example.ucm_discuss_be.notifications.NotificationRepository;
import com.example.ucm_discuss_be.replies.ReplyModel;
import com.example.ucm_discuss_be.replies.ReplyRepository;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.threads.ThreadRepository;
import com.example.ucm_discuss_be.userViewedThreads.UserViewedThreadModel;
import com.example.ucm_discuss_be.userViewedThreads.UserViewedThreadRepository;
import com.example.ucm_discuss_be.userVotesComment.UserVotesCommentModel;
import com.example.ucm_discuss_be.userVotesComment.UserVotesCommentRepository;
import com.example.ucm_discuss_be.userVotesThread.UserVotesThreadModel;
import com.example.ucm_discuss_be.userVotesThread.UserVotesThreadRepository;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;

@Component
@Profile("dev")
@Order(6)
public class FeMockSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MajorRepository majorRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private CourseRepository courseRepository;

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

    @Autowired
    private UserViewedThreadRepository userViewedThreadRepository;

    @Override
    public void run(String... args) {
        if (threadRepository.findAll().stream()
                .anyMatch(thread -> "Sharing: Pengalaman styling pakai Material 3 di React Native".equals(thread.getTitle()))) {
            return;
        }

        System.out.println("Seeding FE mock data...");

        MajorModel informaticsMajor = majorRepository.findById(1L).orElseThrow();
        FacultyModel itFaculty = facultyRepository.findById(1L).orElseThrow();

        UserModel current = ensureUser(
                "han.inno@student.ucm.ac.id",
                "Han Inno",
                "0806022410010",
                false,
                false,
                informaticsMajor,
                itFaculty);

        UserModel peer1 = ensureUser(
                "mifey@student.ucm.ac.id",
                "Mifey",
                "0806022410011",
                false,
                false,
                informaticsMajor,
                itFaculty);

        UserModel peer2 = ensureUser(
                "arichan@student.ucm.ac.id",
                "Arichan",
                "0806022410012",
                false,
                false,
                informaticsMajor,
                itFaculty);

        UserModel anon1 = ensureUser(
                "anonymous1@student.ucm.ac.id",
                "Anonymous",
                "0806022410091",
                false,
                true,
                informaticsMajor,
                itFaculty);

        UserModel anon2 = ensureUser(
                "anonymous2@student.ucm.ac.id",
                "Anonymous",
                "0806022410092",
                false,
                true,
                informaticsMajor,
                itFaculty);

        Map<String, CourseModel> coursesByCode = ensureCourses().stream()
                .collect(Collectors.toMap(CourseModel::getCourse_code, Function.identity()));

        ThreadModel thread1 = ensureThread(
                "Sharing: Pengalaman styling pakai Material 3 di React Native",
                "Buat temen-temen Informatika UCM yang lagi build app pakai RN, ini sedikit tips biar UI/UX nya tetep konsisten. Clean code is poetry! Jangan lupa pakai Context buat theme management.",
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
                false,
                128,
                current,
                coursesByCode.get("MD101"));

        ThreadModel thread2 = ensureThread(
                "Bagaimana cara mengatasi error ADB saat debugging di emulator?",
                "Metro bundler terus menampilkan error \"ADB.exe is not recognized\". Apakah environment variables di Windows perlu di-setting ulang?",
                null,
                false,
                45,
                peer1,
                coursesByCode.get("MD101"));

        ThreadModel thread3 = ensureThread(
                "SIAKAD lambat banget kalau lagi masa KRS-an",
                "Tiap semester pasti begini. Harusnya query databasenya bisa dioptimasi atau pakai Redis caching nggak sih? Ada yang paham arsitektur backend kampus kita?",
                null,
                true,
                215,
                anon1,
                coursesByCode.get("DB101"));

        ThreadModel thread4 = ensureThread(
                "Help DP Problem - Knapsack",
                "Lagi stuck di dynamic programming buat problem knapsack. Ada cara gampang buat bikin state transition-nya lebih jelas?",
                "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=600&auto=format&fit=crop",
                false,
                12,
                peer2,
                coursesByCode.get("AD101"));

        ThreadModel thread5 = ensureThread(
                "GPT-5 sebentar lagi rilis, relevansi tugas akhir kita gimana?",
                "Dengan kapabilitas penalaran logika yang baru, apakah dosen-dosen akan mengubah standar rubrik penilaian untuk project AI kita semester depan? Let's discuss.",
                null,
                true,
                89,
                anon2,
                coursesByCode.get("AI101"));

        CommentModel comment1 = ensureComment(
                thread1,
                peer1,
                "Wah mantap Inno, kebetulan lagi nyari referensi buat implementasi dark mode juga. Boleh share repo-nya nggak?",
                null,
                false,
                false,
                15,
                LocalDateTime.of(2026, 5, 19, 9, 0));

        CommentModel comment1Reply1 = ensureComment(
                thread1,
                current,
                "Siapp Mifey, nanti aku push ke GitHub ya. Kodenya kubuat serapih mungkin biar gampang dibaca.",
                null,
                false,
                false,
                5,
                LocalDateTime.of(2026, 5, 19, 10, 0));

        CommentModel comment1Reply2 = ensureComment(
                thread1,
                anon1,
                "Ikut nyimak link repo-nya bang.",
                null,
                false,
                true,
                2,
                LocalDateTime.of(2026, 5, 19, 11, 0));

        CommentModel comment2 = ensureComment(
                thread1,
                peer2,
                "Info yang sangat daging! Makasih sharingnya bro. Kalau disbanding native development gimana performance-nya?",
                null,
                false,
                false,
                8,
                LocalDateTime.of(2026, 5, 18, 9, 0));

        CommentModel comment2Reply1 = ensureComment(
                thread1,
                current,
                "Selama kita hindari re-render nggak perlu dan optimasi FlashList, feel-nya 99% mirip native kok.",
                null,
                false,
                false,
                12,
                LocalDateTime.of(2026, 5, 18, 10, 0));

        ensureReply(comment1, comment1Reply1);
        ensureReply(comment1, comment1Reply2);
        ensureReply(comment2, comment2Reply1);

        ensureThreadVote(current, thread1);
        ensureThreadVote(current, thread5);

        ensureCommentVote(current, comment1);
        ensureCommentVote(current, comment1Reply1);
        ensureCommentVote(current, comment2Reply1);

        ensureViewedThread(current, thread1, LocalDateTime.of(2026, 5, 19, 12, 0));
        ensureViewedThread(current, thread2, LocalDateTime.of(2026, 5, 18, 15, 0));
        ensureViewedThread(current, thread3, LocalDateTime.of(2026, 5, 18, 16, 0));

        ensureNotification(current, comment1, false);
        ensureNotification(current, comment1Reply2, false);
        ensureNotification(current, comment2, true);
        ensureNotification(current, comment2Reply1, true);

        System.out.println("FE mock data seeded.");
    }

    private UserModel ensureUser(
            String email,
            String name,
            String nim,
            boolean isLecturer,
            boolean isAnon,
            MajorModel major,
            FacultyModel faculty) {
        return userRepository.findByEmail(email).orElseGet(() -> {
            UserModel user = new UserModel();
            user.setEmail(email);
            user.setName(name);
            user.setNimOrNisn(nim);
            user.setIsLecturer(isLecturer);
            user.setIsAnon(isAnon);
            user.setMajor(major);
            user.setFaculty(faculty);
            return userRepository.save(user);
        });
    }

    private List<CourseModel> ensureCourses() {
        Map<String, CourseModel> existingCourses = courseRepository.findAll().stream()
                .collect(Collectors.toMap(CourseModel::getCourse_code, Function.identity()));

        List<CourseModel> desiredCourses = List.of(
                course("AI101", "Artificial Intelligence"),
                course("MD101", "Mobile Development"),
                course("DB101", "Database Systems"),
                course("AD101", "Algorithm Design"),
                course("SE101", "Software Engineering"),
                course("CS101", "Cyber Security"));

        for (CourseModel desiredCourse : desiredCourses) {
            if (!existingCourses.containsKey(desiredCourse.getCourse_code())) {
                courseRepository.save(desiredCourse);
            }
        }

        return courseRepository.findAll().stream()
                .filter(course -> existingCourses.containsKey(course.getCourse_code())
                        || desiredCourses.stream().anyMatch(desired -> desired.getCourse_code().equals(course.getCourse_code())))
                .collect(Collectors.toList());
    }

    private CourseModel course(String code, String name) {
        CourseModel course = new CourseModel();
        course.setCourse_code(code);
        course.setCourse_name(name);
        course.setYear("2026");
        return course;
    }

    private ThreadModel ensureThread(
            String title,
            String content,
            String image,
            boolean isAnon,
            int voteCount,
            UserModel user,
            CourseModel course) {
        return threadRepository.findAll().stream()
                .filter(thread -> title.equals(thread.getTitle()))
                .findFirst()
                .orElseGet(() -> {
                    ThreadModel thread = new ThreadModel();
                    thread.setTitle(title);
                    thread.setContent(content);
                    thread.setImage(image);
                    thread.setIs_anon(isAnon);
                    thread.setVote_count(voteCount);
                    thread.setUser(user);
                    thread.setCourse(course);
                    return threadRepository.save(thread);
                });
    }

    private CommentModel ensureComment(
            ThreadModel thread,
            UserModel user,
            String content,
            String image,
            boolean askedAi,
            boolean isAnon,
            int voteCount,
            LocalDateTime createdAt) {
        return commentRepository.findAll().stream()
                .filter(comment -> content.equals(comment.getContent()) && comment.getThread() != null && thread.getId().equals(comment.getThread().getId()))
                .findFirst()
                .orElseGet(() -> {
                    CommentModel comment = new CommentModel();
                    comment.setThread(thread);
                    comment.setUser(user);
                    comment.setContent(content);
                    comment.setImage(image);
                    comment.setAsked_ai(askedAi);
                    comment.setIs_anon(isAnon);
                    comment.setVote_count(voteCount);
                    comment.setCreated_at(createdAt);
                    return commentRepository.save(comment);
                });
    }

    private void ensureReply(CommentModel parentComment, CommentModel replyComment) {
        boolean exists = replyRepository.findAll().stream().anyMatch(reply ->
                reply.getParent_comment() != null
                        && reply.getReply_comment() != null
                        && parentComment.getId().equals(reply.getParent_comment().getId())
                        && replyComment.getId().equals(reply.getReply_comment().getId()));

        if (exists) {
            return;
        }

        ReplyModel reply = new ReplyModel();
        reply.setParent_comment(parentComment);
        reply.setReply_comment(replyComment);
        replyRepository.save(reply);
    }

    private void ensureThreadVote(UserModel user, ThreadModel thread) {
        boolean exists = userVotesThreadRepository.findAll().stream().anyMatch(vote ->
                vote.getUser() != null
                        && vote.getThread() != null
                        && user.getId().equals(vote.getUser().getId())
                        && thread.getId().equals(vote.getThread().getId()));

        if (exists) {
            return;
        }

        UserVotesThreadModel vote = new UserVotesThreadModel();
        vote.setUser(user);
        vote.setThread(thread);
        userVotesThreadRepository.save(vote);
    }

    private void ensureCommentVote(UserModel user, CommentModel comment) {
        boolean exists = userVotesCommentRepository.findAll().stream().anyMatch(vote ->
                vote.getUser() != null
                        && vote.getComment() != null
                        && user.getId().equals(vote.getUser().getId())
                        && comment.getId().equals(vote.getComment().getId()));

        if (exists) {
            return;
        }

        UserVotesCommentModel vote = new UserVotesCommentModel();
        vote.setUser(user);
        vote.setComment(comment);
        userVotesCommentRepository.save(vote);
    }

    private void ensureViewedThread(UserModel user, ThreadModel thread, LocalDateTime viewedAt) {
        boolean exists = userViewedThreadRepository.findAll().stream().anyMatch(view ->
                view.getUser() != null
                        && view.getThread() != null
                        && user.getId().equals(view.getUser().getId())
                        && thread.getId().equals(view.getThread().getId()));

        if (exists) {
            return;
        }

        UserViewedThreadModel viewed = new UserViewedThreadModel();
        viewed.setUser(user);
        viewed.setThread(thread);
        viewed.setViewed_at(viewedAt);
        userViewedThreadRepository.save(viewed);
    }

    private void ensureNotification(UserModel user, CommentModel comment, boolean isRead) {
        boolean exists = notificationRepository.findAll().stream().anyMatch(notification ->
                notification.getUser() != null
                        && notification.getComment() != null
                        && user.getId().equals(notification.getUser().getId())
                        && comment.getId().equals(notification.getComment().getId()));

        if (exists) {
            return;
        }

        NotificationModel notification = new NotificationModel();
        notification.setUser(user);
        notification.setComment(comment);
        notification.setIs_read(isRead);
        notificationRepository.save(notification);
    }
}