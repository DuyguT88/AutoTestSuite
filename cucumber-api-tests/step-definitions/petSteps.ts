import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import PetAPI from '../api/PetAPI';

let response: any;

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min); // Ensure the minimum value is rounded up
  max = Math.floor(max); // Ensure the maximum value is rounded down
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Given('I have valid pet data with name {string}, status {string}, and category {string}', function (name: string, status: string, category: string) {
  this.petData = {
    id: getRandomInt(10, 1000),
    name: name,
    status: status,
    category: { id: 11, name: category },
    photoUrls: ['http://example.com/photo.jpg']
  };
});

When('I add the pet to the store', async function () {
  try {
    response = await PetAPI.addPet(this.petData);
  } catch (error) {
    console.error(`Error adding pet: ${error.message}`);
    throw new Error(`Failed to add pet: ${error.response?.statusText || error.message}`);
  }
});


Then('I should receive a confirmation with the new pet details', function () {
  expect(response.status).to.equal(200, `Expected response status 200 but got ${response.status}`);
  expect(response.data.name).to.equal(this.petData.name, `Expected pet name to be ${this.petData.name}`);
  expect(response.data.status).to.equal(this.petData.status, `Expected pet status to be ${this.petData.status}`);
  expect(response.data.category.name).to.equal(this.petData.category.name, `Expected pet category name to be ${this.petData.category.name}`);
  expect(response.data.photoUrls).to.be.an('array').that.is.not.empty;
  expect(response.data.photoUrls[0], 'Expected photo URL to be the same').to.equal(this.petData.photoUrls[0]);
});

Then('I can get the added new pet', async function () {
  try {
    const response = await PetAPI.getPet(this.petData.id);
    expect(response.status).to.equal(200, `Expected status 200 but got ${response.status}`);

    const expectedPet = this.petData;
    const actualPet = response.data;
    
    expect(actualPet.name).to.equal(expectedPet.name, `Expected name ${expectedPet.name}`);
    expect(actualPet.status).to.equal(expectedPet.status, `Expected status ${expectedPet.status}`);
    expect(actualPet.category.name).to.equal(expectedPet.category.name, `Expected category ${expectedPet.category.name}`);
    expect(actualPet.photoUrls[0]).to.equal(expectedPet.photoUrls[0], `Expected photo URL ${expectedPet.photoUrls[0]}`);
  } catch (error) {
    throw new Error(`Failed to get the added new pet: ${error.response?.statusText || error.message}`);
  }
});


Given('I have an existing pet ID', async function () {
  this.petId = getRandomInt(10, 1000);
  const petData = {
    id: this.petId,
    name: 'Temp Pet',
    status: 'available',
    category: { id: 0, name: 'Dogs' },
    photoUrls: ['http://example.com/photo.jpg']
  };

  try {
    const result = await PetAPI.addPet(petData);
    expect(result.status, 'Failed to create a new pet').to.equal(200);
    expect(result.data.id).to.equal(this.petId, `Expected pet id to be ${this.petId}`);

  } catch (error) {
    throw new Error(`Failed to create a pet for deletion: ${error.response?.statusText || error.message}`);
  }
});

When('I delete the pet from the store', async function () {
  try {
    const verifyResponse = await PetAPI.getPet(this.petId);
    expect(verifyResponse.status, `Failed to verify pet with ID ${this.petId}`).to.equal(200);
    this.response = await PetAPI.deletePet(this.petId);
  } catch (error) {
    throw new Error(`Pet with ID ${this.petId} not found or already deleted: ${error.response?.statusText || error.message}`);
  }
});

Then('I should receive a confirmation of the deletion', function () {
  expect(this.response.status).to.equal(200, `Expected deletion status 200 but got ${response.status}`);
});

Then('I cannot get the deleted pet', async function () {
  try {
    this.response = await PetAPI.getPet(this.petId);
  } catch (error) {
    this.error = error;
    this.errorOccurred = true;
  }
  expect(this.errorOccurred).to.be.true;
  expect(this.error).to.have.property('message');
  expect(this.error.message).to.include('Request failed with status code 404');
});

When('I update the pet with name {string}, status {string}, and category {string}', async function (name: string, status: string, category: string) {
  this.petData = {
    id: this.petId,
    name: name,
    status: status,
    category: { id: 0, name: category },
    photoUrls: ['http://example.com/photo.jpg']
  };

  try {
    response = await PetAPI.updatePet(this.petData);
    expect(response.status).to.equal(200, `Expected response status 200 but got ${response.status}`);
  } catch (error) {
    throw new Error(`Failed to update the pet: ${error.response?.statusText || error.message}`);
  }
});

Then('I should receive a confirmation with the updated pet details', function () {
  expect(response.data.name).to.equal(this.petData.name, `Expected pet name to be ${this.petData.name}`);
  expect(response.data.status).to.equal(this.petData.status, `Expected pet status to be ${this.petData.status}`);
  expect(response.data.category.name).to.equal(this.petData.category.name, `Expected pet category name to be ${this.petData.category.name}`);
});