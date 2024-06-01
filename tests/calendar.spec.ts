import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

await page.goto('https://susticket-main.vercel.app/');
await page.locator('div').filter({ hasText: /^Calendar$/ }).getByRole('img').click();
await page.getByRole('button', { name: 'Calendar' }).click();
await page.getByRole('button', { name: 'Previous Month' }).click();
await page.getByRole('cell', { name: '-04-16' }).locator('div').nth(3).click();
await page.getByRole('button', { name: 'Next Month' }).click();
await page.locator('td:nth-child(4) > .el-calendar-day > .grid-container > div:nth-child(2) > .circle').click();
await page.locator('td:nth-child(4) > .el-calendar-day > .grid-container > div > .circle').first().click();
await page.locator('td:nth-child(4) > .el-calendar-day > .grid-container > div:nth-child(3) > .circle').click();
await page.locator('td:nth-child(4) > .el-calendar-day > .grid-container > div:nth-child(4) > .circle').click();
await page.getByRole('button', { name: 'Today' }).click();
await page.getByRole('button', { name: 'Next Month' }).click();
await page.locator('[id="__nuxt"] div').filter({ hasText: 'SunMonTueWedThuFriSat2024-05-' }).nth(4).click();
await page.goto('https://susticket-main.vercel.app/calendar/calendarPage');
});