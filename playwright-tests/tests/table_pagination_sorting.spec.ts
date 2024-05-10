// dynamicTableTest.spec.ts

import { test, expect } from '@playwright/test';
import { assert } from 'chai';
import DynamicTablePage from '../page-objects/dynamicTablePage';

test.describe('Dynamic Table', () => {
  test('should find and verify the CPU usage of Chrome', async ({ page }) => {
    const dynamicTablePage = new DynamicTablePage(page);

    // Navigate to the Dynamic Table page
    await dynamicTablePage.navigate();

    // Retrieve CPU usage for Chrome from the table
    const cpuUsageTableNumber = await dynamicTablePage.getChromeCpuFromTable();
    expect(cpuUsageTableNumber).toBeDefined();
    console.log(`CPU usage for Chrome in the table ${cpuUsageTableNumber}`);

    // Retrieve CPU usage for Chrome from the label
    const cpuUsageTextNumber = await dynamicTablePage.getChromeCpuFromLabel();
    expect(cpuUsageTextNumber).toBeDefined();
    console.log(`CPU usage for Chrome in the label ${cpuUsageTextNumber}`);

    // Verify that the CPU usage values match
    assert.equal(cpuUsageTableNumber, cpuUsageTextNumber, `Expected CPU usage for Chrome to be "${cpuUsageTableNumber}" but found "${cpuUsageTextNumber}" instead.`);
  });
});
