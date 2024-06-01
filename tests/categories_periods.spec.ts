import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susticket-main.vercel.app/');
  await page.locator('#notification_1 div').filter({ hasText: 'ErrorError fetching' }).getByRole('img').click();
  await page.locator('#notification_2 div').filter({ hasText: 'Error fetching' }).getByRole('img').click();
  await page.getByRole('img', { name: '~/assets/header/' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Student/Faculty ID').fill('12111428');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('12111428');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'This week' }).click();
  await page.getByRole('link', { name: 'This Month' }).click();
  await page.getByRole('link', { name: 'Next Month' }).click();
  await page.getByRole('link', { name: 'Competition Competition' }).click();
  await page.getByRole('link', { name: 'Fair Fair' }).click();
  await page.getByRole('link', { name: 'Performance Performance' }).click();
  await page.getByRole('link', { name: 'Activity Activity' }).click();
  await page.getByRole('link', { name: 'Seminar Seminar' }).click();
  await page.locator('li').filter({ hasText: 'All' }).click();
  await page.locator('li').filter({ hasText: 'Competition' }).click();
  await page.locator('li').filter({ hasText: 'Fair' }).click();
  await page.locator('li').filter({ hasText: 'Performance' }).click();
  await page.locator('li').filter({ hasText: 'Activity' }).click();
  await page.locator('li').filter({ hasText: 'Seminar' }).click();
});