"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('Verify text input functionality', async ({ page }) => {
    await page.goto('http://www.uitestingplayground.com/textinput');
    await page.fill('#newButtonName', 'Test Button');
    await page.click('#updatingButton');
    const button = await page.$('#updatingButton');
    const buttonText = await button?.innerText();
    (0, test_1.expect)(buttonText).toBe('Test Button');
});
