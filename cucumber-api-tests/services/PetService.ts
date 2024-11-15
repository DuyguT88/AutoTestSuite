import axios, { AxiosResponse } from 'axios';
import { expect } from 'chai';
import ApiUtils from './ApiUtils';
import CONFIG from '../config'; 

const BASE_URL = CONFIG.BASE_URL;
const PET_API_PATH = `${BASE_URL}/pet`;

class PetService{
  static async addPet(petData: any): Promise<AxiosResponse> {
    const request = axios.post(PET_API_PATH, petData);
    return ApiUtils.handleRequest(request);
  }

  static async updatePet(petData: any): Promise<AxiosResponse> {
    const request = axios.put(PET_API_PATH, petData);
    return ApiUtils.handleRequest(request);
  }

  static async deletePet(petId: number): Promise<AxiosResponse> {
    const request = axios.delete(`${PET_API_PATH}/${petId}`, ApiUtils.getAuthHeaders());
    return ApiUtils.handleRequest(request);
  }

  static async getPet(petId: number): Promise<AxiosResponse> {
    const request = axios.get(`${PET_API_PATH}/${petId}`);
    return ApiUtils.handleRequest(request);
  }

  static async deletePetIfExists(petId: number) {
    let errorOccurred = false
    try {
      await axios.get(`${PET_API_PATH}/${petId}`);
    } catch (error) {
      errorOccurred = true;
    }    
    if (errorOccurred == false){
      const response = await axios.delete(`${PET_API_PATH}/${petId}`, ApiUtils.getAuthHeaders());
      expect(response.status).to.equal(200, `Expected response status 200 but got ${response.status}`);
    }
  }
}

export default PetService;
