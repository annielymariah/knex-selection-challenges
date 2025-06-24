import axios from 'axios';

const jsonPlaceholderClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

jsonPlaceholderClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('JSONPlaceholder Error:', errorMessage);
    return Promise.reject(error);
  }
);

export default jsonPlaceholderClient;