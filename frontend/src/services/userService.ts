import axios from 'axios';
import type { User } from '../types/userTypes';

export const UserService = {
  getRandomUser: async (): Promise<User> => {
    try {
      const response = await axios.get<{ results: User[] }>(
        'https://randomuser.me/api/?nat=br'
      );
      return response.data.results[0];
    } catch (error) {
      throw new Error('Falha ao buscar um usuário');
    }
  },

  getMultipleUsers: async (count: number = 1): Promise<User[]> => {
    try {
      const response = await axios.get<{ results: User[] }>(
        `https://randomuser.me/api/?nat=br&results=${count}`
      );
      return response.data.results;
    } catch (error) {
      throw new Error('Falha ao buscar usuários');
    }
  }
};