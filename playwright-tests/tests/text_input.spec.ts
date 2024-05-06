import { test, expect } from '@playwright/test';

test.describe('Text Input Functionality', () => {
  test('should enable button after text input', async ({ page }) => {
    await page.goto('http://www.uitestingplayground.com/textinput');

    // Target the text input and button
    const inputField = page.locator('#newButtonName');
    const button = page.locator('#updatingButton');

    // Verify button initially disabled or has initial text
    await expect(button).toHaveText('Button That Should Change it\'s Name Based on Input Value');

    // Input text and verify button text changes
    await inputField.fill('New Button Name');
    await button.click();
    await expect(button).toHaveText('New Button Name');
  });
});
