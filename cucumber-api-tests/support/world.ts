import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
  petData: any;
  petId: any;
  response: any;
  error: any;
  errorOccurred: boolean;
  username: string;
  userData: any;

  constructor() {
    this.petData = null;
    this.petId = null;
    this.response = null;
    this.error = null;
    this.errorOccurred = false;
    this.username = null;
    this.userData = null;
  }
}

setWorldConstructor(CustomWorld);