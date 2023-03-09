import { test, expect, Page } from '@playwright/test';

test.afterEach(async ({ page }) => {
  // wait until the page is closed
  await page.waitForEvent('close');
});

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h2')).toHaveText(/Movies App/i);
});

test('get started link', async ({ page }) => {
  await page.goto('/movies/1');

  expect(await page.innerText('body')).toMatch(/Release Date/i);
  expect(await page.innerText('body')).toMatch(/Duration/i);

  // Find the link element that has an href attribute with the value of "/"
  const link = page.locator('a[href="/"]');

  // Check that the link element exists
  expect(link).toBeTruthy();

  // Check that the href attribute of the link is "/"
  await expect(link).toHaveAttribute('href', '/');
});
