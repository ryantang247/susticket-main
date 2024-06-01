import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(65000)
  await page.goto('https://susticket-main.vercel.app/');
  await page.getByRole('img', { name: '~/assets/header/' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Student/Faculty ID').fill('12111428');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('12111428');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'event-image on sale This' }).click();

  await page.getByRole('link', { name: 'Get Ticket' }).click();
  await page.getByText('$101 day pass').click();
  await page.locator('div').filter({ hasText: /^Get Ticket Now$/ }).click();

  await page.click("#PaypalButton");
  const page1Promise = page.waitForEvent('popup');
  const page1 = await page1Promise;
  await page1.getByPlaceholder('E-mel atau nombor telefon').click();
await page1.getByPlaceholder('E-mel atau nombor telefon').fill('sb-3kw0w30017105@personal.example.com');
await page1.getByRole('button', { name: 'Seterusnya' }).click();
await page1.getByPlaceholder('Kata laluan').click();
await page1.getByPlaceholder('Kata laluan').fill('Iy#4?iNk');
await page1.getByRole('button', { name: 'Log Masuk' }).click();

});
