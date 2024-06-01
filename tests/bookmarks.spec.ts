import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susticket-main.vercel.app/');
  await page.getByRole('button', { name: 'Bookmark' }).click();
  await page.getByRole('img', { name: '~/assets/header/' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.locator('div').filter({ hasText: 'LOGINLogin' }).nth(2).click();
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Student/Faculty ID').fill('12111428');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('12111428');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div:nth-child(2) > div > .bookmark-share > .bookmark').click();
  await page.locator('div').filter({ hasText: /^Bookmark$/ }).getByRole('img').click();
  await page.locator('div:nth-child(3) > div > .bookmark-share > .bookmark').click();

await page.locator('.bookmark').click();
await page.getByText('Event\'s successfully removed').click();
await page.getByRole('img', { name: 'Back' }).click();



  await page.getByRole('button', { name: 'Bookmark' }).click();
  await page.getByRole('button', { name: 'Bookmark' }).click();
  await page.getByRole('img', { name: 'Back' }).click();
  await page.locator('div').filter({ hasText: /^Bookmark$/ }).getByRole('img').click();
  await page.goto('https://susticket-main.vercel.app/bookmark/bookmarkPage');
});