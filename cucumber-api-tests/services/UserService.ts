import axios, { AxiosResponse } from 'axios';
import { expect } from 'chai';
import ApiUtils from './ApiUtils';
import CONFIG from '../config';

const { BASE_URL } = CONFIG;
const USER_API_PATH = `${BASE_URL}/user`;

class UserService {
  // Method to create a user
  static async createUser(userData: any): Promise<AxiosResponse> {
    const request = axios.post(USER_API_PATH, userData);
    return ApiUtils.handleRequest(request);
  }

  // Method to update a user
  static async updateUser(userData: any): Promise<AxiosResponse> {
    const request = axios.put(`${USER_API_PATH}/${userData.username}`, userData);
    return ApiUtils.handleRequest(request);
  }

  // Method to delete a user by username
  static async deleteUser(username: string): Promise<AxiosResponse> {
    const request = axios.delete(`${USER_API_PATH}/${username}`);
    return ApiUtils.handleRequest(request);
  }

  // Method to get user details by username
  static async getUser(username: string): Promise<AxiosResponse> {
    const request = axios.get(`${USER_API_PATH}/${username}`);
    return ApiUtils.handleRequest(request);
  }

  // Method to delete a user if they exist
  static async deleteUserIfExists(username: string) {
    let errorOccurred = false;
    try {
      await axios.get(`${USER_API_PATH}/${username}`);
    } catch (error) {
      errorOccurred = true;
    }
    if (errorOccurred == false) {
      const response = await axios.delete(`${USER_API_PATH}/${username}`, ApiUtils.getAuthHeaders());
      expect(response.status).to.equal(200, `Expected response status 200 but got ${response.status}`);
    }
  }
}

export default UserService;
