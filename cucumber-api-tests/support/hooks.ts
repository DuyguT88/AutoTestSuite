import { Before, After } from '@cucumber/cucumber';

Before(async function() {
  // Setup code that runs before each scenario
  this.petData = null;
  this.petId = null;
  this.response = null;
  this.error = null;
  this.errorOccurred = null;
});

After(async function() {
  // Cleanup tasks after each scenario
  // For instance, you might want to delete all test data created during the scenario.
});
