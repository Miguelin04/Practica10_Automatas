import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const parseInput = async (input) => {
  try {
    const response = await apiClient.post('/parse', { input });
    return response.data;
  } catch (error) {
    console.error('Error al parsear:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error al verificar salud de API:', error);
    throw error;
  }
};

export default apiClient;
