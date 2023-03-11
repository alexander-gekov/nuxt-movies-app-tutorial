import { test, expect } from '@playwright/test';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

test('movie should be clickable', async ({ page }) => {
  await page.goto('/');

  const input = page.locator('input');

  await sleep(100);

  await input.fill('fly');

  const movieImage = page.locator('css=.movie-gallary-view .movie-card:has(img) > a').first();

  await movieImage.click();

  // check that we are in the right location
  expect(page.url()).toMatch(/movies\/\d+/);

  // check that the movie title has the word fly in it
  expect(await page.locator('h1').innerText()).toMatch(/fly/i);
});
