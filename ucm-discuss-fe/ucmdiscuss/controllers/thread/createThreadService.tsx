export const createThreadUpload = async (
    title: string, 
    content: string, 
    imageUri: string | null
) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        
        if (imageUri) {
            formData.append('image', {
                uri: imageUri,
                name: `post_${Date.now()}.jpg`,
                type: 'image/jpeg',
            } as any);
        }

        const response = await fetch('https://api.ucmdiscuss.com/api/threads', {
            method: 'POST',
            body: formData,
            headers: {
                // 'Authorization': `Bearer ${token}` -> Jika menggunakan Firebase Auth
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        if (!response.ok) throw new Error("Gagal upload thread");

        console.log("Thread sukses dibuat di background!");

    } catch (error) {
        console.error("Background upload gagal:", error);
    }
};