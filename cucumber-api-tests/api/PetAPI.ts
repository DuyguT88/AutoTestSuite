import axios, { AxiosResponse } from 'axios';

const BASE_URL = "https://petstore.swagger.io/v2/pet";

class PetAPI {
  private static getAuthHeaders() {
    const API_TOKEN = process.env.PETSTORE_API_TOKEN || 'test123*';
    return {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };
  }

  static async addPet(petData: any): Promise<AxiosResponse> {
    return axios.post(BASE_URL, petData);
  }

  static async updatePet(petData: any): Promise<AxiosResponse> {
    return axios.put(BASE_URL, petData);
  }

  static async deletePet(petId: number): Promise<AxiosResponse> {
    return axios.delete(`${BASE_URL}/${petId}`, PetAPI.getAuthHeaders());
  }

  static async getPet(petId: number): Promise<AxiosResponse> {
    return axios.get(`${BASE_URL}/${petId}`);
  }
}

export default PetAPI;