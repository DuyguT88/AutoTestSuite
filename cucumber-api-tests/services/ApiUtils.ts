import CONFIG from '../config'; // Import configuration
import { AxiosResponse } from 'axios';

class ApiUtils {
  static getAuthHeaders() {
    if (!CONFIG.API_TOKEN) {
      throw new Error('API token is required');
    }
    return {
      headers: {
        'Authorization': `Bearer ${CONFIG.API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };
  }

  static async handleRequest(request: Promise<AxiosResponse>): Promise<AxiosResponse> {
    try {
      const response = await request;
      return response;
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }
}

export default ApiUtils;
