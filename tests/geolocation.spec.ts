import { test, expect, Locator, Browser, defineConfig } from '@playwright/test';


test.describe('geolocation', () => {

  test.use({
    geolocation: { longitude: 2.333333, latitude: 48.866667 },
    permissions: ['geolocation'],
    locale: '{ fr-FR }',
    // Emulate the network being offline.
    offline: false
  });

  test('geolocation Bing Maps', async ({ page }) => {
    test.slow();
    await page.goto('https://www.bing.com/maps');
    await page.getByRole('button', { name: 'Refuser' }).click();
    await page.getByRole('button', { name: 'Me localiser' }).click();
    await page.getByRole('button', { name: 'Fermer' }).click();
  });

  test('geolocation Google Maps', async ({ page }) => {
    test.slow();
    await page.goto('https://www.google.fr/maps/');
    await page.getByRole('button', { name: 'Refuser' }).click();
    // await page.waitForTimeout(20000);
    await page.getByLabel('Itinéraire', { exact: true }).click();
    await page.getByRole('gridcell', { name: 'Votre position Votre position' }).click();
    await page.getByPlaceholder('Choisissez une destination…').fill('Lille');
    await page.keyboard.press('Enter');
  });

  /* // To override the location written above
  test('my test with geolocation', async ({ page, context }) => {
    // overwrite the location for this test
    await context.setGeolocation({ longitude: 48.858455, latitude: 2.294474 });
  }); */

});