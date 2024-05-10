// ajaxTest.spec.ts (Test file using the modular class)

import { test, expect } from '@playwright/test';
import AjaxPage from '../page-objects/ajaxPage';

test.describe('AJAX Content Loading', () => {
  test('should load content asynchronously', async ({ page }) => {
    const ajaxPage = new AjaxPage(page);

    // Navigate to the AJAX page
    await ajaxPage.navigate();

    // Trigger content loading
    await ajaxPage.triggerContentLoading();

    // Get the loaded content and verify it
    const contentText = await ajaxPage.getContentText();
    expect(contentText).toContain('Data loaded with AJAX get request');
  });
});
