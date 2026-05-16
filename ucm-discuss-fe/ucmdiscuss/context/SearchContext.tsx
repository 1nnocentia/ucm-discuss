import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextType {
    isSearchActive: boolean;
    searchQuery: string;
    openSearch: () => void;
    closeSearch: () => void;
    setSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const openSearch = () => setIsSearchActive(true);
    const closeSearch = () => {
        setIsSearchActive(false);
        setSearchQuery('');
    };

    return (
        <SearchContext.Provider value={{ 
            isSearchActive, 
            searchQuery, 
            openSearch, 
            closeSearch, 
            setSearchQuery 
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) throw new Error('useSearch must be used within a SearchProvider');
    return context;
};