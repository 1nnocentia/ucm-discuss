import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { AuthorSnippet, Post } from '@/models/user';

const fetchSearchResults = async (query: string): Promise<Post[]> => {
    if (!query) return [];
    
    const response = await fetch(`https://api.ucmdiscuss.com/v1/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useSearchThreads = (searchQuery: string, delayMs: number = 500) => {
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, delayMs);

        return () => clearTimeout(handler);
    }, [searchQuery, delayMs]);

    const query = useQuery({
        queryKey: ['search', 'threads', debouncedQuery],
        queryFn: () => fetchSearchResults(debouncedQuery),
        enabled: debouncedQuery.length > 2,
        staleTime: 1000 * 60,
    });

    return {
        ...query,
        isDebouncing: searchQuery !== debouncedQuery && searchQuery.length > 2,
    };
};