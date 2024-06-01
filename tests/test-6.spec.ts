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
await page1.getByTestId('submit-button-initial').click();
await page1.goto('https://secourse2024-675d60a0d98b.herokuapp.com/api/transactionSuccess/72a39322-b9b7-4b2d-9f8b-af2674b1bef5/10/0/undefined?paymentId=PAYID-MZNM7RA2Y7126976S8781004&token=EC-6R524144DT818684W&PayerID=83S49VR52AFRC');
await page1.getByRole('button', { name: 'Continue' }).click();
await page1.getByRole('link', { name: 'Back to Home' }).click();

await page1.locator('div').filter({ hasText: /^My Tickets$/ }).click();
await expect(page1.getByRole('heading', { name: 'This event doesnt have' })).toBeVisible();
await page1.getByRole('button', { name: 'Give Comment' }).nth(1).click();
await page1.getByPlaceholder('Share your thoughts about').click();
await page1.getByPlaceholder('Share your thoughts about').fill('I like this event');
await page1.getByRole('button', { name: 'Submit' }).click();

});
