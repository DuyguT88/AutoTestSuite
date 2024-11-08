import axios, { AxiosResponse } from 'axios';
import { getAuthHeaders, handleRequest } from '../utils';
import CONFIG from '../config'; // Import configuration

const { BASE_URL } = CONFIG; // Destructure BASE_URL
const PET_API_PATH = `${BASE_URL}/pet`; // Define a reusable endpoint path

class PetService {
  static async addPet(petData: any): Promise<AxiosResponse> {
    const request = axios.post(PET_API_PATH, petData, getAuthHeaders());
    return handleRequest(request);
  }

  static async updatePet(petData: any): Promise<AxiosResponse> {
    const request = axios.put(PET_API_PATH, petData, getAuthHeaders());
    return handleRequest(request);
  }

  static async deletePet(petId: number): Promise<AxiosResponse> {
    const request = axios.delete(`${PET_API_PATH}/${petId}`, getAuthHeaders());
    return handleRequest(request);
  }

  static async getPet(petId: number): Promise<AxiosResponse> {
    const request = axios.get(`${PET_API_PATH}/${petId}`, getAuthHeaders());
    return handleRequest(request);
  }
}

export default PetService;
