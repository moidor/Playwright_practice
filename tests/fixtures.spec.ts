import { test, expect, Locator, Browser, Page, Fixtures } from '@playwright/test';
import * as fs from 'fs';
import { googleFixture } from '../classes/GoogleFinalFixture';

// toDoPage fixture Playwright official documentation
googleFixture.beforeEach(async ({ settingsPage }) => {
  await settingsPage.switchToDarkMode();
});

// Créer une classe globale avec cette méthode de lecture de fichiers texte pour en extraire ce dernier
googleFixture('Search on Google with a custom fixture', async ({ page, googleSearchFixture }) => {
  // Unconditionally marks a test as "slow". Slow test will be given triple the default timeout.
  test.slow();
  let search_value: string = '';
  // Reading data from the text file
  try {
    const data_file = fs.readFileSync('misc/data1.txt', 'utf-8');
    const wordList = data_file.split('\r\n');
    search_value = wordList[0];
    expect(search_value.length).not.toBeNull();
    console.log(`Read value from the text file: \'${search_value}\'`);
  } catch (error) {
    // Management of the error
    console.log(new Error(error), new Error().name, new Error().message);
  } finally {
    console.log('Operation terminated');
  }
  
  // Cookies rejection
  await googleSearchFixture.cookiesRejection('Tout refuser');
  await expect(page.locator('#dialog')).toBeHidden();
  // Searching on Google from the text file
  await googleSearchFixture.searchOnGoogle(search_value);
});





// Backup

// Créer une fixture qui gère la complétion du formulaire en prenant comme valeur celle du fichier .txt (streams)
// test('Fixture 1 - Search a YouTube video from a read text file', async ({ page }) => {
//   // Unconditionally marks a test as "slow". Slow test will be given triple the default timeout.
//   test.slow();
//   // Reading data from the text file
//   const data_file = fs.readFileSync('misc/data.txt', 'utf-8');
//   const wordList = data_file.split('\r\n');
//   const search_value = wordList[0];
//   expect(search_value.length).not.toBeNull();
//   console.log(`Read value from the text file: \'${search_value}\'`);
//   // Accessing YouTube homepage
//   await page.goto(`https://www.youtube.com/`);
//   // Cookies rejection
//   await page.getByRole('button', { name: 'Reject' }).click();
//   await expect(page.locator('#dialog')).toBeHidden();

//   await page.getByPlaceholder('Search').fill(`${search_value}`);
//   await page.getByPlaceholder('Search').press('Enter');
//   // await page.getByRole('button', { name: 'Search' }).click();

//   // Looping over the first five results to get a random element
//   // const results = await page.locator('#dismissible').all();
//   // Display in the console each video's title
//   const firstFiveResultsText = (await page.locator('#items #dismissible #video-title').allInnerTexts()).slice(0,5);
//   await expect(firstFiveResultsText).not.toBeNull();
//   console.log(firstFiveResultsText);

//   // Select a random value in the list
//   const firstFiveResults = (await page.locator('#items #dismissible #video-title').all()).slice(0,5);
//   const elementsList = Object.keys(firstFiveResults);
//   const randomIndex = Math.floor(Math.random() * elementsList.length);
//   const randomObject: Locator = firstFiveResults[elementsList[randomIndex]];
//   const randomObjectName = await randomObject.innerText();
//   console.log(`Name of the selected video: '${randomObjectName}'.`);
//   await expect(randomObject).not.toBeEmpty();
//   await randomObject.click();
  
//   // const allTextList = Array.from(allText);
// });

// test('Fixture 2 - Search a YouTube video', async ({ page }) => {
//   const search_value = 'Playwright';

//   await page.goto(`https://www.youtube.com/`);
//   // Cookies rejection
//   await page.getByRole('button', { name: 'Reject' }).click();
//   await expect(page.locator('#dialog')).toBeHidden();

//   await page.getByPlaceholder('Search').fill(`${search_value}`).then(
//     async () => {
//       await page.getByPlaceholder('Search').focus();
//       await page.getByPlaceholder('Search').press('Enter');
//       await page.getByRole('button', { name: 'Search' }).click();
//     }
//   );
//   // await page.getByPlaceholder('Search').focus();
//   // await page.waitForTimeout(5000);
  
//   // await page.getByRole('button', { name: 'Search' }).click();
//   // PROMISE : then() !!!!
// });

// test('Fixture 3 - Search on Google', async ({ page }) => {

//   const search_value = 'Playwright';

//   await page.goto(`https://www.google.fr/`);
//   // Cookies rejection
//   await page.getByRole('button', { name: 'Refuser' }).click();
//   await expect(page.locator('#dialog')).toBeHidden();

//   await page.getByLabel('Rech.').fill(`${search_value}`)
// });
