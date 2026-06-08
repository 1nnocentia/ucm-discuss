import { apiClient } from '@/controllers/services/apiClient';

export const AiService = {
    generateTagAnswer: async (userQuestion: string, threadId?: string): Promise<string> => {
        try {
            if (!userQuestion || userQuestion.trim() === '') {
                throw new Error("Pertanyaan tidak boleh kosong");
            }

            let response;
            if (threadId) {
                response = await apiClient.post(`/api/ai/threads/${threadId}/ask`, {
                    question: userQuestion
                });
            } else {
                response = await apiClient.post('/api/ai/ask', {
                    question: userQuestion
                });
            }

            const answerText = response.data?.answer;

            if (!answerText) {
                throw new Error("AI mengembalikan respons kosong.");
            }

            return answerText.trim();

        } catch (error) {
            console.error("Backend AI Generation Error:", error);
            return "Maaf, sistem sedang kesulitan menjawab pertanyaan ini.";
        }
    }
};