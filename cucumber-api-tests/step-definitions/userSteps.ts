import { Given, When, Then, After, Before} from '@cucumber/cucumber';
import { expect } from 'chai';
import UserService from '../services/UserService';
import '../support/world'; 

// Utility function to generate a random string
function getRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Step to set up user data
Given('I have user data with username {string}, first name {string}, last name {string}', function (user: string, firstName: string, lastName: string) {
  this.username = user;
  this.userData = {
    id: Math.floor(Math.random() * 1000), // Generate a random user ID
    username: user,
    firstName: firstName,
    lastName: lastName,
    email: `${user}.${getRandomString(5)}@example.com`, // Randomized email address
    password: 'password123',
    phone: '1234567890',
    userStatus: 1
  };
});

// Step to create a new user
When('I create the user', async function (){
  try {
    this.response = await UserService.createUser(this.userData);
  } catch (error) {
    this.errorOccurred = true;
    this.response = error.response;
  }
});

Then(
  'the user data should include username {string} and email matching {string}',
  function (expectedUsername: string, emailRegex: string) {
    // Check if the user data has the expected username
    expect(this.response.data.username).to.equal(
      expectedUsername,
      `Expected username ${expectedUsername} but got ${this.response.data.username}`
    );

    // Use a regular expression to match the email
    const emailPattern = new RegExp(emailRegex);
    expect(emailPattern.test(this.response.data.email)).to.be.true;
  }
);

// Step to update the user
When('I update the user with new email {string}', async function (newEmail: string) {
  this.userData.email = newEmail;
  try {
    this.response = await UserService.updateUser(this.userData);
  } catch (error) {
    this.errorOccurred = true;
    this.response = error.response;
  }
});

// Step to get the user details
When('I retrieve the user details', async function () {
  try {
    this.response = await UserService.getUser(this.username);
  } catch (error) {
    this.errorOccurred = true;
    this.response = error.response;
  }
});

// Step to delete the user
When('I delete the user', async function () {
  try {
    this.response = await UserService.deleteUser(this.username);
  } catch (error) {
    this.errorOccurred = true;
    this.response = error.response;
  }
});

// Step to check the response status
Then('I should receive a {int} status code', function (expectedStatusCode: number) {
  expect(this.response.status).to.equal(expectedStatusCode, `Expected status ${expectedStatusCode} but got ${this.response.status}`);
});

// Step to check if the user data is correct
Then('the user data should include username {string} and email {string}', function (expectedUsername: string, expectedEmail: string) {
  expect(this.response.data.username).to.equal(expectedUsername, `Expected username ${expectedUsername} but got ${this.response.data.username}`);
  expect(this.response.data.email).to.equal(expectedEmail, `Expected email ${expectedEmail} but got ${this.response.data.email}`);
});

// Step to ensure the user is deleted and cannot be found
Then('I should not be able to find the user', async function () {
  try {
    await UserService.getUser(this.username);
  } catch (error) {
    expect(error.message).to.include("Request failed with status code 404", `Expected error message to contain "Request failed with status code 404", but got: ${error.message}`);
  }
});

Before(async function() {
  // Setup code that runs before each scenario
  this.username = null;
  this.userData = null;
  this.response = null;
  this.error = null;
  this.errorOccurred = null;
});

After(async function() {
  // Cleanup tasks after each scenario
  // For instance, you might want to delete all test data created during the scenario.
  UserService.deleteUserIfExists(this.username)
});