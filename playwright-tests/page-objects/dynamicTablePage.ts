// dynamicTablePage.ts (Page Object Class)

import { Page } from '@playwright/test';

class DynamicTablePage {
  private page: Page;
  private dynamicTableSelector = 'div[role="row"] >> text=Chrome';
  private chromeCpuLabelSelector = 'xpath=//p[contains(text(), "Chrome CPU:")]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('http://www.uitestingplayground.com/dynamictable');
  }

  async getChromeCpuFromTable(): Promise<string | null> {
    const chromeRow = await this.page.locator(this.dynamicTableSelector);

    // Find the CPU usage cell adjacent to the Chrome row
    const cpuUsageCell = chromeRow.locator('xpath=following-sibling::*[contains(text(), "%")]');

    // Return the text content of the CPU usage cell
    return await cpuUsageCell.textContent();
  }

  async getChromeCpuFromLabel(): Promise<string | null> {
    // Find the "Chrome CPU" text and extract the CPU value
    const chromeCpuText = await this.page.locator(this.chromeCpuLabelSelector).textContent();
    const cpuUsageMatch = chromeCpuText?.match(/(\d+(\.\d+)?)%/); // Regex to find numeric value
    return cpuUsageMatch?.[0] || null;
  }
}

export default DynamicTablePage;
