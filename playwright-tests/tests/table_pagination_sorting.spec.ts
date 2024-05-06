import { test, expect } from '@playwright/test';
import { assert } from 'chai';

test.describe('Dynamic Table', () => {
  test('should find and verify the CPU usage of Chrome', async ({ page }) => {
    let cpuUsageTextNumber;

    // Navigate to the dynamic table page
    await page.goto('http://www.uitestingplayground.com/dynamictable');

    // Locate the table row containing the label "Chrome"
    const chromeRow = await page.locator('div[role="row"] >> text=Chrome');

    // Find the adjacent cell that represents the CPU usage
    const cpuUsageCell = chromeRow.locator('xpath=following-sibling::*[contains(text(), "%")]');

    // Retrieve the text content (CPU usage value) from the adjacent cell
    const cpuUsageTableNumber = await cpuUsageCell.textContent();
    expect(cpuUsageTableNumber).toBeDefined();

    // Optionally, print or log the value for debugging purposes
    console.log(`CPU usage for Chrome in the table ${cpuUsageTableNumber}`);

    // Find the "Chrome CPU" text
    const chromeCPUText = await page.locator('xpath=//p[contains(text(), "Chrome CPU:")]').textContent();
    // Regex to find numeric value followed by a %
    const cpuUsageMatch = chromeCPUText?.match(/(\d+(\.\d+)?)%/); 
    expect(cpuUsageMatch).toBeDefined();
    expect(cpuUsageMatch?.length).toBeGreaterThan(0);
    cpuUsageTextNumber = cpuUsageMatch?.[0];
    console.log(`CPU usage for Chrome in the text ${cpuUsageTextNumber}`);

    // Verify the CPU usage value matches the text
    assert.equal(cpuUsageTableNumber, cpuUsageTextNumber, `Expected CPU usage for Chrome to be "${cpuUsageTableNumber}" but found "${cpuUsageTextNumber}" instead.`);
  });
});
