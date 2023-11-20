import { Page, Locator, expect } from '@playwright/test';

export class GoogleSearchFixture {
  private readonly inputBox: Locator;

  constructor(public readonly page: Page) {
    this.inputBox = this.page.getByLabel('Rech.');
  }

  async goto() {
    await this.page.goto('https://www.google.fr/');
  }

  async cookiesRejection(buttonName: string) {
    // await this.page.getByRole('button', { name: 'Tout refuser' }).click();
    // await expect(cookiesRejectionButton).toBeVisible();
    await this.page.getByRole('button', { name: `${buttonName}` }).highlight();
    await this.page.getByRole('button', { name: `${buttonName}` }).click({delay: 5000});
    // await cookiesRejectionButton.click();
  }

  async searchOnGoogle(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press('Enter');
  }
}
