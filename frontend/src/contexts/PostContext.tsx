import React, { createContext, useContext, useState, useEffect } from 'react';
import { postService } from '../api/services/postService';
import type { Post } from '../api/types/postTypes';

interface PostContextType {
    posts: Post[];
    addPost: (post: Post) => void;
    deletePost: (postId: number) => Promise<void>;
    updatePost: (post: Post) => Promise<void>;
    refreshPosts: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Carrega posts do localStorage ao inicializar (Foi feito pra tentar mitigar a questão da API retornar só 1 id, o 101, não deu certo)
    
    useEffect(() => {
        const loadInitialPosts = async () => {
            try {
                const savedPosts = localStorage.getItem('posts');
                if (savedPosts) {
                    setPosts(JSON.parse(savedPosts));
                }
                await refreshPosts(); // Atualiza com dados frescos da API
            } catch (err) {
                console.error("Erro ao carregar posts:", err);
            }
        };
        loadInitialPosts();
    }, []);

    // Atualiza localStorage quando posts mudam
    useEffect(() => {
        if (posts.length > 0) {
            localStorage.setItem('posts', JSON.stringify(posts));
        }
    }, [posts]);

    const refreshPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedPosts = await postService.getPosts(0);
            setPosts(fetchedPosts);
            localStorage.setItem('posts', JSON.stringify(fetchedPosts)); // Salva os novos posts
        } catch (err) {
            // Mantém os posts do localStorage se a API falhar
            const savedPosts = localStorage.getItem('posts');
            if (!savedPosts) {
                setError('Falha ao carregar postagens');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addPost = (newPost: Post) => {
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const deletePost = async (postId: number) => {
  try {
    setLoading(true);
    await postService.deletePost(postId);

    setPosts(prevPosts => {
      const updatedPosts = prevPosts.filter(post => post.id !== postId);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      return updatedPosts;
    });
    
  } catch (err) {
    setError('Falha ao deletar postagem');
    console.error(err);
    throw err;
  } finally {
    setLoading(false);
  }
};

    const updatePost = async (updatedPost: Post) => {
        try {
            setLoading(true);
            await postService.updatePost(updatedPost.id, updatedPost);
            const updatedPosts = posts.map(post => 
                post.id === updatedPost.id ? updatedPost : post
            );
            setPosts(updatedPosts);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
        } catch (err) {
            setError('Falha ao atualizar postagem');
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <PostContext.Provider 
            value={{ 
                posts, 
                addPost, 
                deletePost, 
                updatePost, 
                refreshPosts, 
                loading, 
                error 
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePosts deve ser usado dentro de um PostProvider');
    }
    return context;
};