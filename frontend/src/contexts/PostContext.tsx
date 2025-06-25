import React, { createContext, useContext, useState, useEffect } from 'react';
import { postService } from '../api/services/postService';
import type { Post } from '../api/types/postTypes';

interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  refreshPosts: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await postService.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, addPost, refreshPosts, loading, error }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts tem que estar com PostProvider');
  }
  return context;
};