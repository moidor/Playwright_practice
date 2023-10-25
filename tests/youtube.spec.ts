import { test, expect, Locator, Browser } from '@playwright/test';
import * as fs from 'fs';

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
// Récupérer la valeur depuis un input : const value = await page.getByRole('textbox').inputValue();
test('Search a YouTube video from a read text file', async ({ page }) => {
    // Unconditionally marks a test as "slow". Slow test will be given triple the default timeout.
    test.slow();
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
  
    // Looping over the first five results to get a random element
    // const results = await page.locator('#dismissible').all();
    // Display in the console each video's title
    const firstFiveResultsText = (await page.locator('#items #dismissible #video-title').allInnerTexts()).slice(0,5);
    await expect(firstFiveResultsText).not.toBeNull();
    console.log(firstFiveResultsText);
  
    // Select a random value in the list
    const firstFiveResults = (await page.locator('#items #dismissible #video-title').all()).slice(0,5);
    const elementsList = Object.keys(firstFiveResults);
    const randomIndex = Math.floor(Math.random() * elementsList.length);
    const randomObject: Locator = firstFiveResults[elementsList[randomIndex]];
    const randomObjectName = await randomObject.innerText();
    console.log(`Name of the selected video: '${randomObjectName}'.`);
    await expect(randomObject).not.toBeEmpty();
    await randomObject.click();
    
    // const allTextList = Array.from(allText);
});

// Search a video on YouTube in French
test.describe('french language tests block', () => {

    test.only('french language youtube video - ONLY annotation', async ({ page }) => {
      await page.goto(`https://www.youtube.com/results?search_query=whale shark`);  
      // Cookies rejection
      await page.getByRole('button', { name: 'Refuser' }).click();
      // await BrowserContext.setGeolocation({ latitude: 59.95, longitude: 30.31667 });
    });
  
    // fixme() : declares a test to be fixed, similarly to test(). This test will not be run.
    test.fixme('fr. youtube video to be skipped...', async ({ page }) => {   
      await page.goto(`https://www.youtube.com/results?search_query=whale shark`);  
      // Cookies rejection
      await page.getByRole('button', { name: 'Refuser' }).click();
      // await BrowserContext.setGeolocation({ latitude: 59.95, longitude: 30.31667 });
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
});