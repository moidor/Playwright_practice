import { test, expect, Page, Locator, Browser, devices, chromium } from '@playwright/test';
import path from 'path';

test('filechooser',async ({ page, browser }) => {
  test.slow();
  const context = await browser.newContext();
  await context.grantPermissions(['geolocation']);

  await page.goto('https://google.fr/', { waitUntil: "load" });
  await page.getByRole('button', { name: 'Tout refuser' }).click();
  await page.getByRole('button', { name: 'Rechercher par image' }).click();
  // Start waiting for file chooser before clicking. Note no await.
  const fileChooserPromise = page.waitForEvent('filechooser');
  
  await page.getByText('importez un fichier').click();
  const fileChooser = await fileChooserPromise;
  // console.log(fileChooser.isMultiple());
  // console.log(fileChooser.element()); 
  await fileChooser.setFiles(path.join('misc\\chat.jpg'));
  await page.getByRole('button', { name: 'Tout refuser' }).click();

  context.clearPermissions();
  // await browser.close();
});

