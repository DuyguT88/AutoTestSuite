import { AxiosResponse } from 'axios';

export const getAuthHeaders = () => {
    const API_TOKEN = process.env.PETSTORE_API_TOKEN || 'test123*';
    if (!API_TOKEN) {
      throw new Error('API token is required');
    }
    return {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
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