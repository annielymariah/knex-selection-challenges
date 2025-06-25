import type { User } from '../types/userTypes';
import { randomUserClient } from '../clients/randomUserClient';

// Função para gerar um ID aleatório
const generateRandomId = (): number => {
  return Math.random() * 1000000 + 1;
};

export const UserService = {
  getRandomUser: async (): Promise<User> => {
    try {
      const response = await randomUserClient.get<{ results: User[] }>('/', {
        params: {
          results: 1,
        }
      });
      
      const user = response.data.results[0];
      user.login.id = generateRandomId();
      
      return user;
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
      
      // Adiciona IDs aleatórios a cada usuário, não consegui elaborar uma lógica melhor para isso
      return response.data.results.map(user => ({
        ...user,
        id: user.id || generateRandomId().toString()
      }));
    } catch (error) {
      throw new Error(`Falha ao buscar usuários: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }
};