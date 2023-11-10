import { test, expect, Page, Locator, Browser, devices, chromium } from '@playwright/test';

// Other ways: const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.
// import { chromium } from 'playwright';  // Or 'firefox' or 'webkit'.

// dialog section from API doc
test('dialog',async ({ }) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
  });
  await page.evaluate(() => alert('1'));
  await browser.close();
});