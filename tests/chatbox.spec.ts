import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susticket-main.vercel.app/');
  await page.getByRole('img', { name: 'Chat Icon' }).click();
  await page.locator('#notification_3 div').filter({ hasText: 'ErrorError fetching data.' }).getByRole('img').click();
  await page.locator('#notification_3 div').filter({ hasText: 'ErrorError fetching data.' }).locator('path').click();
  await page.getByRole('banner').getByRole('img').nth(1).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.locator('form div').nth(4).click();
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Student/Faculty ID').fill('12111428');
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('12111428');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('img', { name: 'Chat Icon' }).click();
  await page.locator('#msg-form-container').getByRole('paragraph').click();
  await page.locator('.ql-editor').fill('gg\'s\'d\'f\'g\'fs\'sgdssgdss\'f\'g\'ds\'f\'sfgdsf');
  await page.getByLabel('arrow-up').locator('path').click();
});