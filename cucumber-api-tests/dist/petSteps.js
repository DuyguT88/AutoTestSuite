"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
(0, cucumber_1.When)('I add the pet to the store', function () {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield axios_1.default.post('https://petstore.swagger.io/v2/pet', petData);
    });
});
(0, cucumber_1.Then)('I should receive a confirmation with the new pet details', function () {
    (0, chai_1.expect)(response.status).to.equal(200);
    (0, chai_1.expect)(response.data.name).to.equal('Max');
});
// Repeat similarly for updatePet and deletePet scenarios with appropriate modifications.
