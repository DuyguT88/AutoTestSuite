// textInputPage.ts (Page Object Class)

import { Page } from '@playwright/test';

class TextInputPage {
  private page: Page;
  private inputSelector = '#newButtonName';
  private buttonSelector = '#updatingButton';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('http://www.uitestingplayground.com/textinput');
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
