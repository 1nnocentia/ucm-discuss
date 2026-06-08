import { useMutation } from '@tanstack/react-query';
import { AiService } from '@/controllers/services/aiService';

export const useGenerateAiTag = (threadId?: string) => {
    return useMutation({
        mutationFn: async (userQuestion: string) => {
            return await AiService.generateTagAnswer(userQuestion, threadId);
        },
        onError: (error) => {
            console.error("Gagal mendapatkan jawaban dari AI:", error);
        },
    });
};
