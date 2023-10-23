import { test, expect, Locator } from '@playwright/test';
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


test('jeuxvideo.com homepage', async ({ page }) => {
  await page.goto('https://www.jeuxvideo.com/tous-les-jeux/');
  await page.getByRole('button', { checked: true }).click();
  // await page.frameLocator('div').getByText('Tout refuser').click();
  // await page.getByText('Tout refuser').nth(1).click();

  const jvClass = await page.locator('.linkLogo__2DdhES').getAttribute('class');
  console.log(jvClass);
});

// Test on a YouTube video
test('YouTube video', async ({ page }) => {
  await page.goto('https://www.youtube.com/watch?v=2yO-pCa1MAY&ab_channel=1MinuteAnimals');
  // Cookies rejection
  await page.getByRole('button', { name: 'Reject' }).click();
  // Pause the video
  await page.getByRole('button', { name: 'Pause' }).click();
  // Change the video quality
  await page.getByRole('button', { name: 'Settings' }).nth(1).click();
  await page.getByText('Quality').nth(0).click();
  await page.getByText('720p').click();
  // Mute the video
  await page.press('button', 'm');
  // Deactivate the Autoplay
  await page.getByRole('button', { name: 'Autoplay' }).click();
  // Put the frame in full screen
  const fullScreenButton = await page.getByRole('button', { name: 'Full screen' });
  expect(fullScreenButton).toBeVisible();
  fullScreenButton.press('f');
  // await page.waitForTimeout(3000)
  // Re-launch the video play
  await page.keyboard.down('k');
  // await page.press('button', 'k');
});

// Search a YouTube video from a read text file
// const value = await page.getByRole('textbox').inputValue();
test('Search a YouTube video from a read text file', async ({ page }) => {
  // Reading data from the text file
  const data_file = fs.readFileSync('misc/data.txt', 'utf-8');
  const wordList = data_file.split('\r\n');
  const search_value = wordList[0];
  expect(search_value.length).not.toBeNull();
  console.log(`Read value from the text file: \'${search_value}\'`);
  // Accessing YouTube homepage
  await page.goto(`https://www.youtube.com/results?search_query=${search_value}`);
  // Cookies rejection
  await page.getByRole('button', { name: 'Reject' }).click();
  await expect(page.locator('#dialog')).not.toBeVisible();
  // await expect(page.locator('#dialog')).toBeHidden();

  // Looping over the (five first ?) results to get a random element
  // const results = await page.locator('#dismissible').all();
  // Display in the console each video's title
  const firstFiveResultsText = (await page.locator('#items #dismissible #video-title').allInnerTexts()).slice(0,5);
  console.log(firstFiveResultsText);

  // Select a random value in the list
  const firstFiveResults = (await page.locator('#items #dismissible #video-title').all()).slice(0,5);
  const elementsList = Object.keys(firstFiveResults);
  const randomIndex = Math.floor(Math.random() * elementsList.length);
  const randomObject: Locator = firstFiveResults[elementsList[randomIndex]];
  const randomObjectName = await randomObject.innerText();
  console.log(`Name of the selected video: ${randomObjectName}`);
  await expect(randomObject).not.toBeEmpty();
  await randomObject.click();
  
  // const allTextList = Array.from(allText);
});