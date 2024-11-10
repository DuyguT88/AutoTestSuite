import { test, expect } from '@playwright/test';
import TextInputPage from '../page-objects/textInputPage';

test.describe('Text Input Functionality', () => {
  test('should enable button after text input', async ({ page }) => {
    const textInputPage = new TextInputPage(page);

    // Navigate to the text input page
    await textInputPage.navigate();

    // Verify initial button text
    const initialText = await textInputPage.getButtonText();
    expect(initialText).toBe("Button That Should Change it's Name Based on Input Value");

    // Fill the input field and click the button
    await textInputPage.fillInputField('New Button Name');
    await textInputPage.clickUpdatingButton();

    // Verify button text changes
    const updatedText = await textInputPage.getButtonText();
    expect(updatedText).toBe('New Button Name');
  });
});
