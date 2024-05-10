// ajaxPage.ts (Module encapsulating page interactions)

import { Page } from '@playwright/test';

class AjaxPage {
  private page: Page;
  private ajaxButtonSelector: string;
  private contentSelector: string;

  constructor(page: Page) {
    this.page = page;
    this.ajaxButtonSelector = '#ajaxButton';
    this.contentSelector = '#content p';
  }

  // Navigate to the AJAX page
  async navigate() {
    await this.page.goto('http://www.uitestingplayground.com/ajax');
  }

  // Trigger content loading by clicking the button
  async triggerContentLoading() {
    await this.page.click(this.ajaxButtonSelector);
  }

  // Wait for the content to appear and return its text
  async getContentText(timeout: number = 17000): Promise<string | null> {
    try {
      await this.page.waitForSelector(this.contentSelector, { state: 'visible', timeout });
    } catch (error) {
      console.error(`Element ${this.contentSelector} was not visible within the specified timeout:`, error);
      return null;
    }
    return await this.page.textContent(this.contentSelector);
  }
}

export default AjaxPage;
