import { Page } from '@playwright/test';
import BasePage from './base/basePage';
import config from '../config/config';

class AjaxPage extends BasePage {
  private ajaxButtonSelector = '#ajaxButton'
  private contentSelector = '#content p';

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate(config.urls.ajax);
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
