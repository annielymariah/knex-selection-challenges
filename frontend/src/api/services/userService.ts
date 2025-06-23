import type { User } from '../types/userTypes';
import { randomUserClient } from '../clients/randomUserClient';

export const UserService = {
  getRandomUser: async (): Promise<User> => {
    try {
      const response = await randomUserClient.get<{ results: User[] }>('/', {
        params: {
          results: 1,
        }
      });
      return response.data.results[0];
    } catch (error) {
      throw new Error(`Falha ao buscar usuário: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  },

  getMultipleUsers: async (count: number = 1): Promise<User[]> => {
    try {
      if (count <= 0) throw new Error('O contador deve ser maior que zero');
      
      const response = await randomUserClient.get<{ results: User[] }>('/', {
        params: {
          results: count,
        }
      });
      return response.data.results;
    } catch (error) {
      throw new Error(`Falha ao buscar usuários: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }
};