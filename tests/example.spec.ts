import { test, expect, Locator, Browser } from '@playwright/test';
import * as fs from 'fs';


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Google homepage', async ({ page }) => {
  await page.goto('https://google.fr/');
  // await page.getByRole('button', { name: 'Tout refuser'}).click();
  // await page.frameLocator('div').getByText('Tout refuser').click();
  // await page.getByText('Tout refuser').nth(1).click();
  // Sélectionner le premier élément qui contient la chaîne "Tout refuser" car il y en a un autre sur la page
  await page.getByText('Tout refuser').nth(0).highlight();

  // Récupérer la valeur de l'attribut "class" de l'image ciblée
  const googleClass = await page.getByRole('img', { name: 'Google' }).getAttribute('class');
  console.log(googleClass);
  await expect(page.getByRole('img', { name: 'Google' })).toBeVisible();

  // Afficher dans la console le texte des éléments contenant la chaîne "paramètres"
  console.log(  await page.getByRole('listitem').filter({ hasText: 'paramètres' }).allTextContents());

  // Savoir combien de "list-item" sont visibles
  const liCount = await page.getByRole('listitem').count();
  console.log(liCount);

  await expect(page.getByRole('heading')).toHaveAttribute('class');

  const headingClassAttr = await page.getByRole('heading').getAttribute('class');
  if (headingClassAttr != null) {
    console.log('Heading class text: ' + headingClassAttr);
  } else {
    console.log('None class...')
  }

  // Récupérer le texte du titre de la page
  console.log('Heading: ' + await page.getByRole('heading').innerText());
});

test.describe('miscellaneous', () => {
  test.use({
    locale: '{ fr-FR }'
  });

  test('browser argument @fast', async ({ page, browser }) => {   
    await page.goto(`https://www.youtube.com/results?search_query=whale shark`);
    // Cookies rejection
    await page.getByRole('button', { name: 'Refuser' }).click();
    // await BrowserContext.setGeolocation({ latitude: 59.95, longitude: 30.31667 });
    console.log(browser.browserType().name());
  });

  test('skip this test @skip', async ({ browserName }) => {
    test.skip(browserName === 'chromium', 'Still working on it');
  });
  
  // custom annotation (to be understood yet...)
  test('user profile', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'https://github.com/microsoft/playwright/issues/<some-issue>',
    });
    // ...
  });

});
