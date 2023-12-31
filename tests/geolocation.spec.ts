import { test, expect, Locator, Browser, Page } from '@playwright/test';


test.describe('geolocation', () => {

  test.use({
    geolocation: { longitude: 2.333333, latitude: 48.866667 },
    permissions: ['geolocation'],
    locale: '{ fr-FR }',
    // Emulate the network being offline.
    offline: false
  });

  test.beforeAll(async ({ }) => {
    console.log('Before...');
    // test.setTimeout(5000);
  });
  
  test.afterAll(async () => {
    console.log('After...');
  });

  test('geolocation Bing Maps', async ({ page, browser, isMobile }) => {
    // test.slow();
    const isBrowserConnected = browser.isConnected();
    console.log(isBrowserConnected);
    if (isBrowserConnected && isMobile == false) {
      // await browser.startTracing(page, { path: 'trace.json' });
      const context = await browser.newContext();
      await context.tracing.start({ screenshots: true, snapshots: true });
      await page.goto('https://www.bing.com/maps', { timeout: 30000 });
      await page.getByRole('button', { name: 'Refuser' }).click();
      await page.getByRole('button', { name: 'Me localiser' }).click();
      await page.getByRole('button', { name: 'Fermer' }).click();
      await context.tracing.stop({ path: 'docs/traces/trace_bing_maps.zip' });
    } else {
      console.log("A problem occurred in the \'if\' condition");
    }
    
  });

  test('geolocation Google Maps', async ({ page }) => {
    test.slow();
    await page.goto('https://www.google.fr/maps/');
    await page.getByRole('button', { name: 'Refuser' }).click();
    // await page.waitForTimeout(10000);
    // const itinerary = await page.getByLabel('Itinéraire', { exact: true });
    const itinerary = page.locator('#hArJGc');
    await itinerary.waitFor({state: 'visible', timeout: 10000});
    await itinerary.click();
    await page.getByRole('gridcell', { name: 'Votre position' }).click();
    // await page.getByLabel('Afficher votre position').click();
    await page.getByPlaceholder('Choisissez une destination…').fill('Lille');
    await page.keyboard.press('Enter');
    // Another way ?: await page.keyboard.down('Enter');
  });

  /* // To override the location written above
  test('my test with geolocation', async ({ page, context }) => {
    // overwrite the location for this test
    await context.setGeolocation({ longitude: 48.858455, latitude: 2.294474 });
  }); */

});