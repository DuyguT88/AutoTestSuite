"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const axios_1 = __importDefault(require("axios"));
const chai_1 = require("chai");
let response;
let petData;
(0, cucumber_1.Given)('I have valid pet data', function () {
    petData = { id: 1, name: 'Max', status: 'available' }; // Simplified pet data
});
(0, cucumber_1.When)('I add the pet to the store', async function () {
    response = await axios_1.default.post('https://petstore.swagger.io/v2/pet', petData);
});
(0, cucumber_1.Then)('I should receive a confirmation with the new pet details', function () {
    (0, chai_1.expect)(response.status).to.equal(200);
    (0, chai_1.expect)(response.data.name).to.equal('Max');
});
// Repeat similarly for updatePet and deletePet scenarios with appropriate modifications.
