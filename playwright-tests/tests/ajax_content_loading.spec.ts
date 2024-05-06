import { test, expect } from '@playwright/test';

test.describe('AJAX Content Loading', () => {
  test('should load content asynchronously', async ({ page }) => {
    await page.goto('http://www.uitestingplayground.com/ajax');

    // Trigger content loading
    await page.click('#ajaxButton');
    try {
      await page.waitForSelector('#content p', { state: 'visible', timeout: 17000 });
    } catch (error) {
      console.error('Element #content p was not visible within the specified timeout:', error);
    }

    // Verify content appears
    const contentText = await page.textContent('#content p');
    expect(contentText).toContain('Data loaded with AJAX get request');
  });
});
