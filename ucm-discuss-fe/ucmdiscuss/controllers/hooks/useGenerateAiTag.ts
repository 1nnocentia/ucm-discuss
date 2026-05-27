import { useMutation } from '@tanstack/react-query';
import { AiService } from '@/controllers/services/aiService';

export const useGenerateAiTag = () => {
    return useMutation({
        mutationFn: async (userQuestion: string) => {
            return await AiService.generateTagAnswer(userQuestion);
        },
        onError: (error) => {
            console.error("Gagal mendapatkan jawaban dari AI:", error);
        },
    });
};
