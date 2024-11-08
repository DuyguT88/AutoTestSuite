// PetService.ts
import axios, { AxiosResponse } from 'axios';
import { getAuthHeaders, handleRequest } from '../utils'; // Import getAuthHeaders and handleRequest

const BASE_URL = "https://petstore.swagger.io/v2/pet";

class PetService {
  static async addPet(petData: any): Promise<AxiosResponse> {
    const request = axios.post(BASE_URL, petData, getAuthHeaders());
    return handleRequest(request); // Use handleRequest from utils
  }

  static async updatePet(petData: any): Promise<AxiosResponse> {
    const request = axios.put(BASE_URL, petData, getAuthHeaders());
    return handleRequest(request); // Use handleRequest from utils
  }

  static async deletePet(petId: number): Promise<AxiosResponse> {
    const request = axios.delete(`${BASE_URL}/${petId}`, getAuthHeaders());
    return handleRequest(request); // Use handleRequest from utils
  }

  static async getPet(petId: number): Promise<AxiosResponse> {
    const request = axios.get(`${BASE_URL}/${petId}`, getAuthHeaders());
    return handleRequest(request); // Use handleRequest from utils
  }
}

export default PetService;
