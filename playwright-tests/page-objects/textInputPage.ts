import { Page } from '@playwright/test';
import BasePage from './base/basePage';
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

  async clickUpdatingButton() {
    await this.page.click(this.buttonSelector);
  }

  async getButtonText(): Promise<string | null> {
    return super.getText(this.buttonSelector);
  }
}

export default TextInputPage;
