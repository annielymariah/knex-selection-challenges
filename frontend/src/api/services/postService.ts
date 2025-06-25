import { jsonPlaceholderClient } from '../clients/jsonPlaceholderClient';
import type { Post, CreatePostDto, UpdatePostDto } from '../types/postTypes';

export const postService = {

  getPosts: async (limit?: number): Promise<Post[]> => {
    try {
      const response = await jsonPlaceholderClient.get<Post[]>('/posts');
      return typeof limit === 'number' 
        ? response.data.slice(0, limit) 
        : response.data;
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
      throw new Error('Falha ao buscar postagens');
    }
  },

  getPost: async (id: number): Promise<Post> => {
    try {
      const response = await jsonPlaceholderClient.get<Post>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar postagem ${id}:`, error);
      throw new Error(`Postagem com id ${id} não encontrada`);
    }
  },

  createPost: async (post: CreatePostDto): Promise<Post> => {
    try {
      const response = await jsonPlaceholderClient.post<Post>('/posts', post);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
      throw new Error('Falha ao criar postagem');
    }
  },

  updatePost: async (id: number, post: UpdatePostDto): Promise<Post> => {
    try {
      const response = await jsonPlaceholderClient.patch<Post>(`/posts/${id}`, post);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar a postagem id ${id}:`, error);
      throw new Error(`Falha ao atualizar postagem ${id}`);
    }
  },

  deletePost: async (id: number): Promise<void> => {
    try {
      await jsonPlaceholderClient.delete(`/posts/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar postagem ${id}:`, error);
      throw new Error(`Falha ao deletar postagem ${id}`);
    }
  },
};