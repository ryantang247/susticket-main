import { test, expect } from '@playwright/test';
  //Error: locator.click: Test timeout of 30000ms exceeded. waiting

test('test', async ({ page }) => {
  await page.goto('https://susticket-main.vercel.app/');
  await page.locator('div:nth-child(7) > div > a').click();
  // await page.getByText('3Cart').click();
  // await page.getByRole('button', { name: 'Bookmark' }).click();
  await page.locator('div').filter({ hasText: /^Calendar$/ }).click();
  await page.getByRole('img', { name: 'logo' }).click();
  await page.getByRole('button', { name: 'Find event' }).click();
  await page.locator('canvas').click({
    position: {
      x: 512,
      y: 130
    }
  });
  await page.locator('canvas').click({
    position: {
      x: 376,
      y: 76
    }
  });
  await page.locator('canvas').click({
    position: {
      x: 597,
      y: 300
    }
  });
  await page.locator('canvas').click({
    position: {
      x: 241,
      y: 144
    }
  });
  await page.locator('canvas').click({
    position: {
      x: 541,
      y: 472
    }
  });
  await page.getByLabel('Close this dialog').click();
  await page.locator('canvas').click({
    position: {
      x: 528,
      y: 453
    }
  });
  await page.getByLabel('Close this dialog').click();
  await page.locator('canvas').click({
    position: {
      x: 520,
      y: 196
    }
  });
  await page.getByLabel('Close this dialog').click();
  await page.locator('canvas').click({
    position: {
      x: 629,
      y: 207
    }
  });
  await page.getByLabel('Close this dialog').click();
  await page.locator('canvas').click({
    position: {
      x: 712,
      y: 105
    }
  });
  await page.getByLabel('Close this dialog').click();
  await page.locator('canvas').click({
    position: {
      x: 545,
      y: 279
    }
  });
  await page.locator('canvas').click({
    position: {
      x: 577,
      y: 103
    }
  });
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByLabel('Close this dialog').click();
  await page.locator('canvas').click({
    position: {
      x: 416,
      y: 165
    }
  });
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByLabel('Close this dialog').click();
  await page.locator('div').filter({ hasText: /^Bookmark$/ }).click();
  await page.getByRole('img', { name: 'logo' }).click();
  await page.locator('div:nth-child(3) > div > .bookmark-share > .bookmark').click();
  await page.getByRole('button', { name: 'Bookmark' }).click();
  await page.locator('div').filter({ hasText: /^Calendar$/ }).getByRole('img').click();
  await page.locator('div').filter({ hasText: /^Calendar$/ }).getByRole('img').click();
  await page.getByRole('img', { name: 'logo' }).click();
  await page.locator('.event-card > div > a').first().click();
  await page.getByRole('button', { name: 'Add Comment' }).click();
  await page.getByPlaceholder('Share your thoughts about').click();
  await page.getByPlaceholder('Share your thoughts about').fill('yowww supsszzz');
  await page.getByRole('button', { name: 'Click to upload' }).click();
  await page.getByRole('button', { name: 'Click to upload' }).setInputFiles('20240528_170123.jpg');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('div').filter({ hasText: /^My Tickets$/ }).getByRole('img').click();
  await page.getByRole('button', { name: 'Calendar' }).click();
  await page.locator('.user-profile').click();
  await page.getByRole('button', { name: '5' }).click();
  await page.locator('div').filter({ hasText: /^My Events$/ }).click();
  await page.getByText('CalendarBookmarkMy Tickets3Cart11NotificationJohnnyjohnny@gmail.com5Log outMy').click();
  await page.locator('div').filter({ hasText: /^2024-05-17$/ }).click();
  await page.locator('.user-profile > img').click();
  await page.getByText('2024 MayPrevious').click();
  await page.getByRole('button', { name: 'Previous Month' }).click();
  await page.getByRole('cell', { name: '-04-17' }).locator('div').nth(3).click();
  await page.locator('div').filter({ hasText: /^2024-04-23$/ }).click();
  await page.locator('div:nth-child(3) > .circle').first().click();
  await page.locator('.user-profile > img').click();
  await page.getByRole('cell', { name: '-04-26' }).locator('div').nth(2).click();
  await page.locator('.user-profile').click();
  await page.locator('.user-profile > img').click();
  await page.locator('div').filter({ hasText: /^My Tickets$/ }).getByRole('img').click();
  await page.goto('https://susticket-main.vercel.app/myTickets/myTickets');
  await page.getByRole('img', { name: 'Chat Icon' }).click();
  await page.locator('html').click();
  await page.locator('#ce-login-fail-breaker').click();
  await page.getByRole('button', { name: 'x' }).click();
  await page.getByRole('img', { name: 'Chat Icon' }).click();
  await page.getByRole('button', { name: 'x' }).click();
  await page.locator('div').filter({ hasText: /^Calendar$/ }).click();
  await page.locator('div').filter({ hasText: 'Loading...' }).first().click();
  await page.locator('.user-profile > img').click();
  await page.locator('#notification_1').click();
  await page.locator('div:nth-child(16) > div > a').click();
  await page.getByRole('heading', { name: 'Copy link' }).click();
  await page.locator('div').filter({ hasText: /^BookmarkCopy link$/ }).getByRole('img').click();
  await page.getByRole('heading', { name: 'Copy link' }).click();
  await page.getByRole('heading', { name: 'Bookmark' }).click();
  await page.goto('https://susticket-main.vercel.app/checkoutSingle/f0b01f8c-7662-44e0-b069-cc4cc6fb1815?eventId=f0b01f8c-7662-44e0-b069-cc4cc6fb1815&seatsioEventsKey&totalAmount=30.00&seatDetails=[{%22type%22:%225x5+Senior%22,%22booking%22:1,%22price%22:%2220.00%22},{%22type%22:%223x3+Junior%22,%22booking%22:1,%22price%22:%2210.00%22}]&seatLabels=[]');
  await page.goto('https://susticket-main.vercel.app/events/7c76b370-a2bf-4158-b5fb-8e1304cfc5ff');
  test.setTimeout(120 * 1000);
});