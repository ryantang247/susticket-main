import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susticket-main.vercel.app/');
  await page.getByRole('img', { name: '~/assets/header/' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Student/Faculty ID').fill('12111428');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('12111428');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Find event' }).click();
  await page.locator('.amap-layers').click();
  await page.getByText('+').click();
  await page.getByText('-', { exact: true }).click();
  await page.locator('.amap-pointers').click();
  await page.locator('.amap-pitchUp').click();
  await page.locator('.amap-pitchDown').click();
  await page.locator('.amap-rotateRight').click();
  await page.locator('.amap-rotateLeft').click();
  await page.locator('canvas').click({
    position: {
      x: 318,
      y: 475
    }
  });
  await page.getByRole('heading', { name: 'College of Engineering' }).click();
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByRole('heading', { name: 'Place for Science Geek' }).click();
  await page.getByRole('heading', { name: 'Events occuring at this place:' }).click();
  await page.getByRole('link', { name: 'Badminton Exam' }).click();
  await page.locator('.back').click();
  await page.getByRole('button', { name: 'Find event' }).click();
  await page.locator('canvas').click({
    position: {
      x: 188,
      y: 318
    }
  });
  await page.getByRole('heading', { name: 'College of Engineering' }).click();
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByRole('heading', { name: 'Place for Science Geek' }).click();
  await page.getByRole('heading', { name: 'Events occuring at this place:' }).click();
  await page.getByRole('link', { name: 'dinner' }).click();
  
  await page.locator('.back').click();
  await page.getByRole('button', { name: 'Find event' }).click();
  await page.locator('canvas').click({
    position: {
      x: 743,
      y: 365
    }
  });
  await page.getByRole('heading', { name: 'Faculty Apartment Basketball' }).click();
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByRole('heading', { name: 'Rubberized Basketball Court' }).click();
  await page.getByRole('heading', { name: 'Events occuring at this place:' }).click();
  await page.getByRole('link', { name: 'Basketball Competition' }).click();
  await page.locator('canvas').click({
    position: {
      x: 752,
      y: 279
    }
  });
  await page.getByRole('heading', { name: 'Football Field' }).click();
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByRole('heading', { name: 'Events occuring at this place:' }).click();
  await page.getByRole('link', { name: 'Track Competition' }).click();
  await page.locator('.back').click();
  await page.getByRole('button', { name: 'Find event' }).click();
  await page.locator('canvas').click({
    position: {
      x: 603,
      y: 521
    }
  });
  await page.getByRole('heading', { name: 'Swimming Pool 3' }).click();
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByRole('heading', { name: 'Swimming Pool Next to Fengyu' }).click();
  await page.getByRole('heading', { name: 'Events occuring at this place:' }).click();
  await page.getByRole('link', { name: 'Sleeping Competition' }).click();
  await page.locator('canvas').click({
    position: {
      x: 762,
      y: 291
    }
  });
  await page.getByRole('link', { name: 'This event doesnt have' }).click();
  await page.getByRole('img', { name: 'Event Thumbnail' }).click();
  await page.getByRole('img', { name: 'Event Thumbnail' }).click();
  await page.getByRole('heading', { name: 'This event doesnt have' }).click();
  await page.goto('https://susticket-main.vercel.app/events/72a39322-b9b7-4b2d-9f8b-af2674b1bef5');
});