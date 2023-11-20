import { test, expect, Page, Locator, Browser, devices, chromium, Frame } from '@playwright/test';

// test.beforeEach(async ({ page }, testInfo) => {
//   // Extend timeout for all tests running this hook by 150 seconds.
//   test.setTimeout(testInfo.timeout + 150000);
// });

test('downloading a file',async ({ }) => {
  // Long timeout because of the important download process duration due to a slow connection
  test.setTimeout(150000);
  const browser = await chromium.launch();
  const page = (await browser.newPage());
  await page.goto('https://get.videolan.org/vlc/3.0.20/win64/vlc-3.0.20-win64.exe');
  
  // Start waiting for download before clicking. Note no await. A timeout is present to detect the download
  const downloadPromise = page.waitForEvent('download', {
    timeout: 90000 // Timeout in milliseconds (90 seconds in this case)
  });
  const download = await downloadPromise;

  // Wait for the download process to complete and save the downloaded file somewhere.
  await download.saveAs('docs/saved_files/' + download.suggestedFilename());
  console.log('URL of download: ' + download.url());
  // console.log('PAGE: ' + download.page());
  // console.log('PATH: ' + download.path());
  await browser.close();
});

