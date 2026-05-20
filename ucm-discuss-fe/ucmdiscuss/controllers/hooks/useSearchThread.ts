import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ApiService } from '@/controllers/services/apiService';


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
        queryFn: () => ApiService.search(debouncedQuery),
        enabled: debouncedQuery.length > 2,
        staleTime: 1000 * 60,
    });

    return {
        ...query,
        isDebouncing: searchQuery !== debouncedQuery && searchQuery.length > 2,
    };
};