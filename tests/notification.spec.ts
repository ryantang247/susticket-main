import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.goto('https://susticket-main.vercel.app/');
  await page.locator('div').filter({ hasText: /^Notification$/ }).click();
  await page.getByRole('img', { name: '~/assets/header/' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Student/Faculty ID').fill('12111428');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('12111428');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Notification' }).click();
  await page.locator('div').filter({ hasText: /^Hello SE ProjectThis is week 15\. Enjoy\.\.\.\.2024-05-28 22:32:49$/ }).locator('h3').click();
  await page.locator('div').filter({ hasText: /^Hello SE ProjectThis is week 15\. Enjoy\.\.\.\.2024-05-28 22:32:49$/ }).getByRole('paragraph').click();
  await page.getByRole('heading', { name: 'Hihi jsut to let you know' }).click();
  await page.getByText('Yow').click();
  await page.getByRole('heading', { name: 'We are haivng a presentation' }).click();
  await page.getByText('Yeah').click();
  await page.locator('div').filter({ hasText: /^11$/ }).getByRole('img').click();
  await page.getByText('11', { exact: true }).click();
});