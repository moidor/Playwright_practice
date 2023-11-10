import { test, expect, Page, Locator, Browser, devices, chromium } from '@playwright/test';
import { log } from 'console';
import * as fs from 'fs';
import * as stream from 'node:stream';
import * as zip from 'zlib';

test('console messages',async ({ page }) => {
  await page.goto('https://google.fr/');
  // Listen for all console logs
  page.on('console', msg => console.log(msg.text()));

  // Listen for all console events and handle errors
  page.on('console', msg => {
    if (msg.type() === 'error')
      console.log(`Error text: "${msg.text()}"`);
  });

  // Get the next console log
  const msgPromise = page.waitForEvent('console');
  await page.evaluate(() => {
    console.log('hello', 42, { foo: 'bar' });  // Issue console.log inside the page
  });
  const msg = await msgPromise;

  // Deconstruct console log arguments
  await msg.args()[0].jsonValue(); // hello
  await msg.args()[1].jsonValue(); // 42
});