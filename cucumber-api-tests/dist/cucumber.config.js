"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
class CustomWorld {
    constructor() {
        this.variable = 0;
    }
}
(0, cucumber_1.setWorldConstructor)(CustomWorld);
(0, cucumber_1.setDefaultTimeout)(60 * 1000); // Sets the default timeout for all tests to 60 seconds.
