// tests/home.spec.ts
import { test, expect } from '@playwright/test';

test('homepage has correct title and navigation', async ({ page }) => {
  // Go to local dev server or build preview
  await page.goto('http://localhost:4321/');

  // Check title
  await expect(page).toHaveTitle(/My Astro Site/);

  // Click a link
  await page.click('text=About');

  // Verify URL
  await expect(page).toHaveURL(/.*about/);
});