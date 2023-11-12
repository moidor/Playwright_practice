import { test, expect, Page, Locator, Browser, devices, chromium, Logger } from '@playwright/test';

test('logger', async () => {
  // Configurer le navigateur pour utiliser le logger personnalisé
  const browser = await chromium.launch({ 
    logger: {
      isEnabled: (name, severity) => name === 'browser',
      log: (name, severity, message, args) => console.log(`${name} ${message} ${severity} ${args}`)
    }
   });

  // L'utilisation du navigateur générera des logs personnalisés
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://google.com');
  await page.screenshot({ path: 'screenshot.png' });

  // Fermer le navigateur
  await browser.close();
});
