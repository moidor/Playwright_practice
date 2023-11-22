import { Page } from '@playwright/test';

export class SettingsPage {
  constructor(public readonly page: Page) {
  }

  async switchToDarkMode() {
    console.log('beforeEach mock \'Switch to Dark mode\'');
  }
}