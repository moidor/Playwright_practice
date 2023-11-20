import { test, expect, Page, Locator, Browser, devices, chromium } from '@playwright/test';
import { log } from 'console';
import * as fs from 'fs';
import * as stream from 'node:stream';
import * as zip from 'zlib';


test('has title and searching', async ({ page }) => {
  test.slow();
  await test.info().attach('screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
  await page.goto('https://playwright.dev/', { waitUntil: "load" });
  await expect.poll(async () => {
    const response = await page.request.get('https://playwright.dev');
    return response.status();
  }, {
    // Custom error message, optional.
    message: 'make sure API eventually succeeds', // custom error message
    // Poll for 10 seconds; defaults to 5 seconds. Pass 0 to disable timeout.
    timeout: 10000,
  }).toBe(200);
  // page.frame({ url: /.*domain.*/ });
  // Expect a title "to contain" a substring with a custom message
  await expect(page, 'Title should be visible...').toHaveTitle(/Playwright/);
  // Opening a link by pressing 'Enter'
  await page.getByRole('link', { name: 'Get started' }).click();
  // IMPORTANT to focus on the search input so that execute the next short "Control+K"
  await page.getByRole('button', { name: 'Search' }).focus();
  // Searching by press the website shortcut "Control+K". Another way: await page.keyboard.press('Control+K');
  await page.getByRole('button', { name: 'Search' }).press('Control+K');
  // await page.keyboard.press('Control+K');
  // Search text
  // await page.getByPlaceholder('Search docs').fill('cookies');
  await page.getByPlaceholder('Search docs').pressSequentially('cookies', {delay: 100});
  const inputCookiesValue = await page.getByPlaceholder('Search docs').inputValue();
  expect.soft(inputCookiesValue, 'My soft assertion to get the input value').toBe('cookies');
  await page.getByRole('link', { name: 'cookies​ BrowserContext', exact: true }).waitFor({state: 'visible'});
  await page.getByRole('link', { name: 'cookies​ BrowserContext', exact: true }).press('Enter');
  // page.keyboard.press('Enter');
  // Right click
  // await page.getByRole('link', { name: 'Get started' }).click({button: 'right'});
});

// Not recommended to execute in serial mode unlike the parallel one
// test.describe.configure({ mode: 'serial' });
//   test('runs in parallel 1', async ({ page }) => {
//     await page.goto('https://playwright.dev/');
//     // Expect a title "to contain" a substring.
//     await expect(page).toHaveTitle(/Playwright/);
//     // Opening a link by pressing 'Enter'
//     await page.getByRole('link', { name: 'Get started' }).press('Enter');
//     // await page.waitForLoadState('load');
//   });
//   test('runs in parallel 2', async ({ page }) => {
//     // Searching by press the website shortcut "Control+K"
//     await page.getByRole('button', { name: 'Search' }).press('Control+K');
// });

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
    console.log(browser.browserType().name());
  });

  // To skip a test
  test('skip this test @skip', async ({ browserName }) => {
    test.skip(browserName === 'chromium', 'Still working on it');
  });
  
  // custom annotation (to be understood yet...)
  test('user profile', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'https://github.com/microsoft/playwright/issues/<some-issue>',
  });
  });

  test('multiple pages', async ({ }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      recordVideo: {
        dir: "./docs/videos"
      }
    });
    // Create two pages
    const pageOne = await context.newPage();
    const pageTwo = await context.newPage();

    // Get pages of a browser context
    const allPages = context.pages();

    await pageOne.goto("https://google.com", { waitUntil: "load" });
    await pageTwo.goto("https://apple.com", { waitUntil: "load" });
    // await page.goto("https://github.com", { waitUntil: "networkidle" })

    await browser.close();
  });
})

test('multiple pages with video recording', async ({ }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    // recordVideo: {
    //   dir: "./docs/videos"
    // }
  });
  const browserName = browser.browserType().name();
  console.log('Server: ' + browserName);
  // Putting the network offline...
  // await context.setOffline(true);

  // Create two pages
  const pageOne = await context.newPage();
  const pageTwo = await context.newPage();

  // Get pages of a browser context, etc.
  // console.log(context.pages());
  console.log('COOKIES...: ' + context.cookies());
  console.log('Storage: ' + await context.storageState({ path: 'D:\Sauvegarde travaux Cham\Playwright\docs'} ));

  await pageOne.goto("https://google.com", { waitUntil: "load" });
  await pageTwo.goto("https://apple.com", { waitUntil: "load" });
  // await page.goto("https://github.com", { waitUntil: "networkidle" })

  await browser.close();
});

