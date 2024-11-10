import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',  // Directory where tests are located
  testMatch: '**/*.spec.ts',  // Pattern to find test files
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    trace: 'on-first-retry' // Collect a trace on first retry
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } }
  ],
  reporter: [
    //['dot'],  // Simple console output
    ['json', { outputFile: 'test-results/JSON/ui-test-json.json' }],  // JSON report
    ['junit', { outputFile: 'test-results/XML/ui-test-results-xml.xml' }],  // JUnit XML report
    ['html', { outputFolder: 'ui-tests-html-report' }]  // HTML report in a separate folder, since HTML reporter will clear its output directory before generating the report, leading to potential data loss if both directories overlap.
  ]
};

export default config;W
