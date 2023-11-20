import { test as base } from '@playwright/test';
import { GoogleSearchFixture } from './GoogleSearchFixture';
import { SettingsPage } from './settings-page';

  // Declare the types of your fixtures.
  type MyFixtures = {
    googleSearchFixture: GoogleSearchFixture;
    settingsPage: SettingsPage;
  };

// Extend base test by providing "googleSearchFixture" (and "settingsPage".)
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const googleFixture = base.extend<MyFixtures>({
  googleSearchFixture: async ({ page }, use) => {
    // Set up the fixture.
    const googleSearchFixture = new GoogleSearchFixture(page);
    await googleSearchFixture.goto();
    // await googleSearchFixture.cookiesRejection('Tout refuser');
    // await googleSearchFixture.searchOnGoogle('');

    // Use the fixture value in the test.
    await use(googleSearchFixture);
  },

  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
});
export { expect } from '@playwright/test';
