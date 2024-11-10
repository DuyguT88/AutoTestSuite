import { Page } from '@playwright/test';

class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async getText(locator: string) : Promise<string | null>  {
    return await this.page.textContent(locator);
  }
}

export default BasePage;
