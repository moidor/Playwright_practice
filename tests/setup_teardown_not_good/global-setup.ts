import { test, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // test.slow();
  console.log('Global setup !');
}

export default globalSetup;