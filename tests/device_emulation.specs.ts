import { test, expect, Locator, Browser, devices, } from '@playwright/test';


test('iPhone emulation', async ({ browser }) => { 
  // test.slow();
  // It's necessary to activate the device in the projects object in the defineConfig class
  const iphone13 = devices['iPhone 13'];
  // Creation of a new context browser containing all the device's attributes with the spread operator "..."
  const context = await browser.newContext({
    ...iphone13,
  });
  const page = await context.newPage();
  await page.goto('https://playwright.dev');  
  console.log(iphone13);
});