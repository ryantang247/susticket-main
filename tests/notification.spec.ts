import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susticket-main.vercel.app/');
  await page.getByRole('img', { name: 'logo' }).click();
  await page.getByRole('banner').getByRole('img').nth(1).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Student/Faculty ID').fill('12111428');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('12111428');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('banner').click();
  await page.getByRole('banner').click();
  await page.getByRole('banner').click();
  await page.getByRole('banner').click({
    clickCount: 3
  });
  await page.getByRole('banner').getByRole('img').nth(1).click();
  await page.getByText('Hello, Ryan!What event are').click();
  await page.locator('div').filter({ hasText: /^11$/ }).getByRole('img').click();
  await expect(page.getByRole('banner')).toContainText('Hello SE Project');
});