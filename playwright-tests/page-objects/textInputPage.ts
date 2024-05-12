import { Page } from '@playwright/test';
import BasePage from './basePage';
import config from '../config/config';

class TextInputPage extends BasePage {
  private inputSelector = '#newButtonName';
  private buttonSelector = '#updatingButton';

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate(config.urls.textInput);
  }

  async fillInputField(newText: string) {
    await this.page.fill(this.inputSelector, newText);
  }

  async clickButton() {
    await this.page.click(this.buttonSelector);
  }

  async getButtonText(): Promise<string | null> {
    return await this.page.textContent(this.buttonSelector);
  }
}

export default TextInputPage;
