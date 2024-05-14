import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',  // Directory where tests are located
  testMatch: '**/*.spec.ts',  // Pattern to find test files
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } }
    //{ name: 'WebKit', use: { browserName: 'webkit' } }
  ],
  reporter: [
    //['dot'],  // Simple console output
    ['json', { outputFile: 'test-results/results-json.json' }],  // JSON report
    ['junit', { outputFile: 'test-results/ui-test-results-xml.xml' }],  // JUnit XML report
    ['html', { outputFolder: 'ui-tests-html-report' }]  // HTML report
  ]
};

export default config;
