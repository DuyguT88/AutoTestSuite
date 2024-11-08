import { AxiosResponse } from 'axios';
import CONFIG from './config'; // Import configuration


export const getAuthHeaders = () => {
    if (!CONFIG.API_TOKEN) {
      throw new Error('API token is required');
    }
    return {
      headers: {
        'Authorization': `Bearer ${CONFIG.API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };
  };
  
  export const handleRequest = async (request: Promise<AxiosResponse>): Promise<AxiosResponse> => {
    try {
      const response = await request;
      return response;
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  };