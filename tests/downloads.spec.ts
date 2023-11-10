import { test, expect, Page, Locator, Browser, devices, chromium } from '@playwright/test';

test('downloading a file',async ({ }) => {
  const browser = await chromium.launch();
  const page = (await browser.newPage());
  await page.goto('https://www.taekwondo-idf.com/files/file/AGE_POIDS_%202022.pdf');
  
  // Start waiting for download before clicking. Note no await.
  const downloadPromise = page.waitForEvent('download');
  // await page.getByText('Download file').click();
  // await download.createReadStream();
  const download = await downloadPromise;

  // Wait for the download process to complete and save the downloaded file somewhere.
  await download.saveAs('docs\saved_files' + download.suggestedFilename());
  await browser.close();
});

