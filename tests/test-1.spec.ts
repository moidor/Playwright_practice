import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('feed the cat');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('water the plants');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
});