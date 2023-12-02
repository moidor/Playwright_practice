import { test, expect, Page, Locator, Browser, devices, chromium } from '@playwright/test';
import path from 'path';

test.describe('filechoose test.describe()', () => {
  test.use({
    locale: '{ fr-FR }'
  });

  test('filechooser',async ({ page, browser }) => {
    test.slow();
    const context = await browser.newContext();
    await context.grantPermissions(['geolocation']);
  
    await page.goto('https://google.fr/', { waitUntil: "load" });
    await page.getByRole('button', { name: 'Tout refuser' }).click();
    await page.getByRole('button', { name: 'Rechercher par image' }).click();
    
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'upload a file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join('D:\\Sauvegarde travaux Cham\\Playwright\\misc\\', 'chat.jpg'));

    await page.getByRole('button', { name: 'Tout refuser' }).click();
    // The Google's website doesn't still work... As a result, we can import later with the next buttons.
    // await page.getByRole('button', { name: 'Importer' }).click();
    // await page.getByLabel('Ordinateur').click();    
    context.clearPermissions();
    // await browser.close();
  });
})
