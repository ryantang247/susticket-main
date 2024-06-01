import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susticket-main.vercel.app/');
  await page.goto('https://susticket-main.vercel.app/login');
  await page.goto('https://susticket-main.vercel.app/');
  await page.goto('https://susticket-main.vercel.app/events/d9cdf022-e6f5-4af6-87a8-1f036acff36e');
  await page.goto('https://susticket-main.vercel.app/booking/d9cdf022-e6f5-4af6-87a8-1f036acff36e');
});