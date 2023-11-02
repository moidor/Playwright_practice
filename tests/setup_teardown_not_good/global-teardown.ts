import { test, type FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // test.slow();
  console.log('Global teardown !');
}

export default globalTeardown;