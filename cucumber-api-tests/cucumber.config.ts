import { setWorldConstructor, setDefaultTimeout, World } from '@cucumber/cucumber';

// Extending the base World class from Cucumber to add custom properties
class CustomWorld extends World {
    variable: number;  // Declare the property with its type

    constructor(options: any) {
        super(options);
        this.variable = 0;  // Initialize your custom property
    }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000); // Sets the default timeout for all tests to 60 seconds.
