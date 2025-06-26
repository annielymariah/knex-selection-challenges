import { jsonPlaceholderClient } from '../clients/jsonPlaceholderClient';
import type { Post, CreatePostDto, UpdatePostDto } from '../types/postTypes';

export const postService = {

  getPosts: async (limit?: number): Promise<Post[]> => {
    try {
      const response = await jsonPlaceholderClient.get<Post[]>('/posts');
      console.log('Retorno da requisição getPosts:', response.data);
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
      console.log(`Retorno da requisição getPost (${id}):`, response);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar postagem ${id}:`, error);
      throw new Error(`Postagem com id ${id} não encontrada`);
    }
  },

  createPost: async (post: CreatePostDto): Promise<Post> => {
    try {
      const response = await jsonPlaceholderClient.post<Post>('/posts', post);
      console.log('Retorno da requisição createPost:', response);
      console.log('Retorno do response.data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
      throw new Error('Falha ao criar postagem');
    }
  },

  updatePost: async (id: number, post: UpdatePostDto): Promise<Post> => {
    try {
      const response = await jsonPlaceholderClient.patch<Post>(`/posts/${id}`, post);
      console.log('Retorno da requisição updatePost:', response);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar a postagem id ${id}:`, error);
      throw new Error(`Falha ao atualizar postagem ${id}`);
    }
  },

  deletePost: async (id: number): Promise<void> => {
    try {
      const response = await jsonPlaceholderClient.delete(`/posts/${id}`);
      console.log(`Retorno da requisição deletePost (${id}):`, response);
    } catch (error) {
      console.error(`Erro ao deletar postagem ${id}:`, error);
      throw new Error(`Falha ao deletar postagem ${id}`);
    }
  },
};