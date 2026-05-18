import React, { createContext, useContext, useEffect, useState, useCallback, FC, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '@/models/user';

export interface LocalFeedPost extends Post {
    syncStatus: 'pending' | 'published';
    retryAvailableAt: number;
    retryCount: number;
    lastError: string | null;
    createdAtTimestamp: number;
}

interface PendingUploadsContextType {
    localPosts: LocalFeedPost[];
    isReady: boolean;
    addLocalPost: (post: Omit<LocalFeedPost, 'syncStatus' | 'retryAvailableAt' | 'retryCount' | 'lastError' | 'createdAtTimestamp'> & { retryAvailableAt?: number; createdAtTimestamp?: number }) => Promise<void>;
    updateLocalPost: (id: string, updates: Partial<LocalFeedPost>) => Promise<void>;
    removeLocalPost: (id: string) => Promise<void>;
    markPostPublished: (id: string) => Promise<void>;
    markPostRetryable: (id: string, error?: string) => Promise<void>;
    persistLocalPosts: (posts: LocalFeedPost[]) => Promise<void>;
}

const PendingUploadsContext = createContext<PendingUploadsContextType | undefined>(undefined);

const STORAGE_KEY = '@local_feed_posts';
export const RETRY_COOLDOWN_MS = 30_000;

export const PendingUploadsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [localPosts, setLocalPosts] = useState<LocalFeedPost[]>([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        loadLocalPosts();
    }, []);

    const persistLocalPosts = useCallback(async (nextPosts: LocalFeedPost[]) => {
        setLocalPosts(nextPosts);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts));
        } catch (error) {
            console.error('Error saving local posts:', error);
        }
    }, []);

    const loadLocalPosts = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                setLocalPosts(JSON.parse(stored));
            }
            // setIsReady(true);
        } catch (error) {
            console.error('Error loading local posts:', error);
            setIsReady(true);
        }
    };

    const modifyPosts = useCallback(async (updater: (prevPosts: LocalFeedPost[]) => LocalFeedPost[]) => {
        setLocalPosts((prev) => {
            const nextPosts = updater(prev);
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts)).catch(err => 
                console.error('Error saving local posts:', err)
            );
            return nextPosts;
        });
    }, []);

    const addLocalPost = useCallback(
        async (post: Omit<LocalFeedPost, 'syncStatus' | 'retryAvailableAt' | 'retryCount' | 'lastError' | 'createdAtTimestamp'> & { retryAvailableAt?: number; createdAtTimestamp?: number }) => {
            if (!isReady) return; // Keamanan ganda

            const nextPost: LocalFeedPost = {
                ...post,
                syncStatus: 'pending',
                retryAvailableAt: post.retryAvailableAt ?? Date.now() + RETRY_COOLDOWN_MS,
                retryCount: 0,
                lastError: null,
                createdAtTimestamp: post.createdAtTimestamp ?? Date.now(),
            };
            
            await modifyPosts((prev) => [nextPost, ...prev]);
        },
        [isReady, modifyPosts]
    );

    const updateLocalPost = useCallback(
        async (id: string, updates: Partial<LocalFeedPost>) => {
            await modifyPosts((prev) => 
                prev.map((post) => (post.id === id ? { ...post, ...updates } : post))
            );
        },
        [modifyPosts]
    );

    const removeLocalPost = useCallback(
        async (id: string) => {
            await modifyPosts((prev) => prev.filter((post) => post.id !== id));
        },
        [modifyPosts]
    );

    const markPostPublished = useCallback(
        async (id: string) => {
            await updateLocalPost(id, {
                syncStatus: 'published',
                retryCount: 0,
                lastError: null,
            });
        },
        [updateLocalPost]
    );

    const markPostRetryable = useCallback(
        async (id: string, error?: string) => {
            await modifyPosts((prev) => 
                prev.map((post) => {
                    if (post.id === id) {
                        return {
                            ...post,
                            syncStatus: 'pending',
                            retryCount: post.retryCount + 1,
                            retryAvailableAt: Date.now() + RETRY_COOLDOWN_MS,
                            lastError: error ?? 'Upload gagal',
                        };
                    }
                    return post;
                })
            );
        },
        [modifyPosts]
    );

    return (
        <PendingUploadsContext.Provider
            value={{
                localPosts,
                isReady,
                addLocalPost,
                updateLocalPost,
                removeLocalPost,
                markPostPublished,
                markPostRetryable,
                persistLocalPosts,
            }}
        >
            {children}
        </PendingUploadsContext.Provider>
    );
};

export const usePendingUploads = () => {
    const context = useContext(PendingUploadsContext);
    if (!context) {
        throw new Error('usePendingUploads must be used within PendingUploadsProvider');
    }
    return context;
};
