export const getAllThreads = async () => {
    try {
        const response = await fetch('https://api.ucmdiscuss.com/api/threads', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) throw new Error("Gagal mengambil data thread");

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Gagal fetch feed:", error);
        return []; 
    }
};