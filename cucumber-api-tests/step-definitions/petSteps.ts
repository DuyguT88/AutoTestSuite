import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { expect } from 'chai';

const BASE_URL = "https://petstore.swagger.io/v2/pet";
let response: any;

function getAuthHeaders() {
  const API_TOKEN = process.env.PETSTORE_API_TOKEN || 'test123*';
  return {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };
}

// Step definitions for Adding a new pet
Given('I have valid pet data with name {string}, status {string}, and category {string}', function (name: string, status: string, category: string) {
  this.petData = {
    name: name,
    status: status,
    category: { id: 11, name: category },
    photoUrls: ['http://example.com/photo.jpg']
  };
});

When('I add the pet to the store', async function () {
  try {
    response = await axios.post(BASE_URL, this.petData, getAuthHeaders());
  } catch (error) {
    throw new Error(`Failed to add pet: ${error.response?.statusText || error.message}`);
  }
});

Then('I should receive a confirmation with the new pet details', function () {
  expect(response.status).to.equal(200, `Expected response status 200 but got ${response.status}`);

  // Check that each detail matches the expected data
  expect(response.data.name).to.equal(this.petData.name, `Expected pet name to be ${this.petData.name}`);
  expect(response.data.status).to.equal(this.petData.status, `Expected pet status to be ${this.petData.status}`);
  expect(response.data.category.name).to.equal(this.petData.category.name, `Expected pet category name to be ${this.petData.category.name}`);

  // Ensure photo URLs are the same
  expect(response.data.photoUrls).to.be.an('array').that.is.not.empty;
  expect(response.data.photoUrls[0], 'Expected photo URL to be the same').to.equal(this.petData.photoUrls[0]);
});

// Step definitions for Deleting an existing pet
Given('I have an existing pet ID', async function () {
  const newPet = {
    name: 'Temp Pet',
    status: 'available',
    category: { id: 0, name: 'Dogs' },
    photoUrls: ['http://example.com/photo.jpg']
  };

  try {
    const result = await axios.post(BASE_URL, newPet, getAuthHeaders());
    expect(result.status, 'Failed to create a new pet').to.equal(200);
    this.petId = result.data.id;  // Store the pet ID for deletion or further testing
  } catch (error) {
    throw new Error(`Failed to create a pet for deletion: ${error.response?.statusText || error.message}`);
  }
});

When('I delete the pet from the store', async function () {
  try {
    const verifyResponse = await axios.get(`${BASE_URL}/${this.petId}`, getAuthHeaders());
    expect(verifyResponse.status, `Failed to verify pet with ID ${this.petId}`).to.equal(200);
    response = await axios.delete(`${BASE_URL}/${this.petId}`, getAuthHeaders());
  } catch (error) {
    throw new Error(`Pet with ID ${this.petId} not found or already deleted: ${error.response?.statusText || error.message}`);
  }
});

Then('I should receive a confirmation of the deletion', function () {
  expect(response.status).to.equal(200, `Expected deletion status to be 200 but got ${response.status}`);
});

// Step definitions for Updating an existing pet
Given('I have an existing pet with ID {int}', function (id: number) {
  this.updatedPet = {
    id: id,
    name: '',
    status: '',
    category: { id: 11, name: '' },
    photoUrls: ['http://example.com/photo-updated.jpg']
  };
});

When('I update the pet with name {string}, status {string}, and category {string}', async function (name: string, status: string, category: string) {
  // Update the local pet data with new values
  this.updatedPet.name = name;
  this.updatedPet.status = status;
  this.updatedPet.category.name = category;

  try {
    response = await axios.put(BASE_URL, this.updatedPet, getAuthHeaders());
    expect(response.status).to.equal(200, `Expected response status 200 but got ${response.status}`);
  } catch (error) {
    throw new Error(`Failed to update the pet: ${error.response?.statusText || error.message}`);
  }
});

Then('I should receive a confirmation with the updated pet details', function () {
  expect(response.status).to.equal(200, `Expected update status 200 but got ${response.status}`);
  expect(response.data.name).to.equal(this.updatedPet.name, `Expected pet name to be ${this.updatedPet.name}`);
  expect(response.data.status).to.equal(this.updatedPet.status, `Expected pet status to be ${this.updatedPet.status}`);
  expect(response.data.category.name).to.equal(this.updatedPet.category.name, `Expected pet category name to be ${this.updatedPet.category.name}`);
});
