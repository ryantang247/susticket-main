import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susticket-main.vercel.app/');
  await page.locator('.user-profile > img').click();
  await page.locator('#notification_1 div').filter({ hasText: 'Error fetching' }).getByRole('img').click();
  await page.locator('#notification_2 div').filter({ hasText: 'ErrorError fetching carts.' }).getByRole('img').click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Student/Faculty ID').fill('12111428');
  await page.getByPlaceholder('Password').click();
  await page.locator('div').filter({ hasText: 'LOGINLogin' }).nth(3).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1211');
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Student/Faculty ID').click();
  await page.getByPlaceholder('Password').click();
  // await page.locator('svg').click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('12111428');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'on going' }).first().click();
  await page.locator('.event-card > div > a').first().click();
  // await page.locator('div').filter({ hasText: /^Get Ticket$/ }).click();
  // await page.frameLocator('iframe[title="seating chart"]').locator('#chartContainer div').first().click();
  await page.goto('https://susticket-main.vercel.app/');
  await page.locator('.event-card > div > a').first().click();
  await page.locator('div').filter({ hasText: /^Get Ticket$/ }).click();
  await page.frameLocator('iframe[title="seating chart"]').locator('#chartContainer div').first().click();
  await page.frameLocator('iframe[title="seating chart"]').locator('#chartContainer div').first().click();
  await page.frameLocator('iframe[title="seating chart"]').locator('#chartContainer div').first().click();
  await page.getByText('2Cart').click();
  await page.goto('https://susticket-main.vercel.app/booking/66082f64-6683-495c-8fe7-f5bb94145676');
  await page.frameLocator('iframe[title="seating chart"]').locator('#chartContainer div').first().click();
  await page.frameLocator('iframe[title="seating chart"]').locator('#chartContainer div').first().click();
  await page.frameLocator('iframe[title="seating chart"]').locator('#chartContainer div').first().click();
  await page.locator('div').filter({ hasText: /^10$/ }).getByRole('img').click();
  await page.getByText('NoticeEveryone please fill in').click();
  await page.getByText('Please do not step on the').click();
  await page.getByRole('heading', { name: 'Notice Urgent!' }).click();
  await page.getByRole('button', { name: 'Calendar' }).click();
  await page.locator('div').filter({ hasText: /^Calendar$/ }).getByRole('img').click();
  await page.getByRole('button', { name: 'Previous Month' }).click();
  await page.locator('div').filter({ hasText: /^2024-04-24$/ }).click();
  await page.locator('td:nth-child(4) > .el-calendar-day > .grid-container > div:nth-child(2) > .circle').click();
  await page.locator('tr:nth-child(4) > td:nth-child(4) > .el-calendar-day > .grid-container > div > .circle').first().click();
  await page.locator('tr:nth-child(4) > td:nth-child(4) > .el-calendar-day > .grid-container').click();
  await page.locator('div').filter({ hasText: /^2024-04-22$/ }).click();
  await page.getByRole('button', { name: 'Next Month' }).click();
  await page.locator('tr:nth-child(5) > td:nth-child(4) > .el-calendar-day > .grid-container').click();
  await page.locator('td:nth-child(4) > .el-calendar-day > .grid-container > div').first().click();
  await page.locator('tr:nth-child(5) > td:nth-child(4) > .el-calendar-day > .grid-container').click();
  await page.getByRole('img', { name: 'logo' }).click();
  await page.getByRole('img', { name: 'logo' }).click();
  await page.getByRole('navigation').click();
  await page.getByRole('link', { name: 'Competition Competition' }).click();
  await page.locator('div:nth-child(6) > div > a').click();
  await page.getByRole('link', { name: 'Get Ticket' }).click();
  await page.getByText('$205x5 Senior').click();
  await page.getByRole('heading', { name: '$10' }).click();
  await page.getByText('+Add to Cart').click();
  await page.getByText('Get Ticket Now').click();
  await page.getByRole('spinbutton').click();
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('iframe[name="__zoid__paypal_buttons__eyJzZW5kZXIiOnsiZG9tYWluIjoiaHR0cHM6Ly9zdXN0aWNrZXQtbWFpbi52ZXJjZWwuYXBwIn0sIm1ldGFEYXRhIjp7IndpbmRvd1JlZiI6eyJ0eXBlIjoicGFyZW50IiwiZGlzdGFuY2UiOjB9fSwicmVmZXJlbmNlIjp7InR5cGUiOiJyYXciLCJ2YWwiOiJ7XCJ1aWRcIjpcInpvaWQtcGF5cGFsLWJ1dHRvbnMtdWlkXzlmMzBiMWQzNWFfbXRpNm5keTZtamVcIixcImNvbnRleHRcIjpcImlmcmFtZVwiLFwidGFnXCI6XCJwYXlwYWwtYnV0dG9uc1wiLFwiY2hpbGREb21haW5NYXRjaFwiOntcIl9fdHlwZV9fXCI6XCJyZWdleFwiLFwiX192YWxfX1wiOlwiXFxcXC5wYXlwYWxcXFxcLihjb218Y24pKDpcXFxcZCspPyRcIn0sXCJ2ZXJzaW9uXCI6XCIxMF8zXzNcIixcInByb3BzXCI6e1wic3R5bGVcIjp7XCJsYWJlbFwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJsYXlvdXRcIjpcInZlcnRpY2FsXCIsXCJjb2xvclwiOlwiZ29sZFwiLFwic2hhcGVcIjpcInJlY3RcIixcInRhZ2xpbmVcIjpmYWxzZSxcImhlaWdodFwiOjQwLFwicGVyaW9kXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcIm1lbnVQbGFjZW1lbnRcIjpcImJlbG93XCIsXCJkaXNhYmxlTWF4V2lkdGhcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiYm9yZGVyUmFkaXVzXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifX0sXCJjcmVhdGVPcmRlclwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkX2RkNWMzOWQzNTRfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcImNyZWF0ZU9yZGVyXCJ9fSxcIm9uQXBwcm92ZVwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzU4ZjZjMjVmOGRfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcIm9uQXBwcm92ZVwifX0sXCJvbkNhbmNlbFwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzJlNzc0ZTIxYmVfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcIm9uQ2FuY2VsXCJ9fSxcImNzcE5vbmNlXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcImFsbG93QmlsbGluZ1BheW1lbnRzXCI6dHJ1ZSxcImFtb3VudFwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJhcGlTdGFnZUhvc3RcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiYXBwbGVQYXlcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiYXBwbGVQYXlTdXBwb3J0XCI6ZmFsc2UsXCJicmFuZGVkXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcImJ1dHRvbkxvY2F0aW9uXCI6XCJzdXN0aWNrZXQtbWFpbi52ZXJjZWwuYXBwXCIsXCJidXR0b25TZXNzaW9uSURcIjpcInVpZF83ZjE1MWRjYTEwX210aTZuZHk2bWplXCIsXCJidXR0b25TaXplXCI6XCJodWdlXCIsXCJidXllckNvdW50cnlcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiY2xpZW50QWNjZXNzVG9rZW5cIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiY3VzdG9tZXJJZFwiOlwiXCIsXCJjbGllbnRJRFwiOlwiQVFZb1EtT3B6cHpTZkloWmN6LWlhc25KNkdVRUJBdms4MThGUWY0Snl1aGFzcVRrdk1MaFZwNGRQYTlVWElia1o5VzBxdmRYTVJhMnVfZHZcIixcImNsaWVudE1ldGFkYXRhSURcIjpcInVpZF8xZDJlODg3ZmQxX210aTZuZHk2bWplXCIsXCJjb21taXRcIjp0cnVlLFwiY29tcG9uZW50c1wiOltcImJ1dHRvbnNcIl0sXCJjcmVhdGVCaWxsaW5nQWdyZWVtZW50XCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcImNyZWF0ZVN1YnNjcmlwdGlvblwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJjcmVhdGVWYXVsdFNldHVwVG9rZW5cIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiY3NwXCI6e1wibm9uY2VcIjpcIlwifSxcImN1cnJlbmN5XCI6XCJVU0RcIixcImRlYnVnXCI6ZmFsc2UsXCJkaXNhYmxlQ2FyZFwiOltdLFwiZGlzYWJsZUZ1bmRpbmdcIjpbXCJjcmVkaXRcIixcImNhcmRcIl0sXCJkaXNhYmxlU2V0Q29va2llXCI6dHJ1ZSxcImRpc3BsYXlPbmx5XCI6W10sXCJlbmFibGVGdW5kaW5nXCI6W10sXCJlbmFibGVUaHJlZURvbWFpblNlY3VyZVwiOmZhbHNlLFwiZW5hYmxlVmF1bHRcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiZW52XCI6XCJzYW5kYm94XCIsXCJleHBlcmltZW50XCI6e1wiZW5hYmxlVmVubW9cIjpmYWxzZX0sXCJleHBlcmltZW50YXRpb25cIjp7fSxcImZsb3dcIjpcInB1cmNoYXNlXCIsXCJmdW5kaW5nRWxpZ2liaWxpdHlcIjp7XCJwYXlwYWxcIjp7XCJlbGlnaWJsZVwiOnRydWUsXCJ2YXVsdGFibGVcIjp0cnVlfSxcInBheWxhdGVyXCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhdWx0YWJsZVwiOmZhbHNlLFwicHJvZHVjdHNcIjp7XCJwYXlJbjNcIjp7XCJlbGlnaWJsZVwiOmZhbHNlLFwidmFyaWFudFwiOm51bGx9LFwicGF5SW40XCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhcmlhbnRcIjpudWxsfSxcInBheWxhdGVyXCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhcmlhbnRcIjpudWxsfX19LFwiY2FyZFwiOntcImVsaWdpYmxlXCI6ZmFsc2UsXCJicmFuZGVkXCI6dHJ1ZSxcImluc3RhbGxtZW50c1wiOmZhbHNlLFwidmVuZG9yc1wiOntcInZpc2FcIjp7XCJlbGlnaWJsZVwiOnRydWUsXCJ2YXVsdGFibGVcIjp0cnVlfSxcIm1hc3RlcmNhcmRcIjp7XCJlbGlnaWJsZVwiOnRydWUsXCJ2YXVsdGFibGVcIjp0cnVlfSxcImFtZXhcIjp7XCJlbGlnaWJsZVwiOnRydWUsXCJ2YXVsdGFibGVcIjp0cnVlfSxcImRpc2NvdmVyXCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhdWx0YWJsZVwiOnRydWV9LFwiaGlwZXJcIjp7XCJlbGlnaWJsZVwiOmZhbHNlLFwidmF1bHRhYmxlXCI6ZmFsc2V9LFwiZWxvXCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhdWx0YWJsZVwiOnRydWV9LFwiamNiXCI6e1wiZWxpZ2libGVcIjp0cnVlLFwidmF1bHRhYmxlXCI6dHJ1ZX0sXCJtYWVzdHJvXCI6e1wiZWxpZ2libGVcIjp0cnVlLFwidmF1bHRhYmxlXCI6dHJ1ZX0sXCJkaW5lcnNcIjp7XCJlbGlnaWJsZVwiOnRydWUsXCJ2YXVsdGFibGVcIjp0cnVlfSxcImN1cFwiOntcImVsaWdpYmxlXCI6dHJ1ZSxcInZhdWx0YWJsZVwiOnRydWV9fSxcImd1ZXN0RW5hYmxlZFwiOmZhbHNlfSxcInZlbm1vXCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhdWx0YWJsZVwiOmZhbHNlfSxcIml0YXVcIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcImNyZWRpdFwiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwiYXBwbGVwYXlcIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcInNlcGFcIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcImlkZWFsXCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJiYW5jb250YWN0XCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJnaXJvcGF5XCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJlcHNcIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcInNvZm9ydFwiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwibXliYW5rXCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJwMjRcIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcIndlY2hhdHBheVwiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwicGF5dVwiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwiYmxpa1wiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwidHJ1c3RseVwiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwib3h4b1wiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwiYm9sZXRvXCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJib2xldG9iYW5jYXJpb1wiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwibWVyY2Fkb3BhZ29cIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcIm11bHRpYmFuY29cIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcInNhdGlzcGF5XCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJwYWlkeVwiOntcImVsaWdpYmxlXCI6ZmFsc2V9fSxcImZ1bmRpbmdTb3VyY2VcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiZ2V0UGFnZVVybFwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzVhODI4MjUwYWZfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcImdldFBhZ2VVcmxcIn19LFwiZ2V0UG9wdXBCcmlkZ2VcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF84YzY3MGIwZTdhX210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJnZXRQb3B1cEJyaWRnZVwifX0sXCJnZXRQcmVyZW5kZXJEZXRhaWxzXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfZjg0NjU0OTM3N19tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwiZ2V0UHJlcmVuZGVyRGV0YWlsc1wifX0sXCJnZXRRdWVyaWVkRWxpZ2libGVGdW5kaW5nXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfYzcxYzVkYzNiNF9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwiZ2V0UXVlcmllZEVsaWdpYmxlRnVuZGluZ1wifX0sXCJob3N0ZWRCdXR0b25JZFwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJpbnRlbnRcIjpcImNhcHR1cmVcIixcImpzU2RrTGlicmFyeVwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJsb2NhbGVcIjp7XCJjb3VudHJ5XCI6XCJVU1wiLFwibGFuZ1wiOlwiZW5cIn0sXCJtZXJjaGFudElEXCI6W10sXCJtZXJjaGFudFJlcXVlc3RlZFBvcHVwc0Rpc2FibGVkXCI6ZmFsc2UsXCJtZXNzYWdlXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcIm5vbmNlXCI6XCJcIixcIm9uQ2xpY2tcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwib25Db21wbGV0ZVwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJvbkluaXRcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF8wNTQwNjZiMmYwX210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJvbkluaXRcIn19LFwib25NZXNzYWdlQ2xpY2tcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF8wYzIyMDk1Mjg2X210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJvbk1lc3NhZ2VDbGlja1wifX0sXCJvbk1lc3NhZ2VIb3ZlclwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzQyYzY3YmMwZTVfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcIm9uTWVzc2FnZUhvdmVyXCJ9fSxcIm9uTWVzc2FnZVJlYWR5XCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfMGIwMGI2YmMwYV9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwib25NZXNzYWdlUmVhZHlcIn19LFwib25TaGlwcGluZ0FkZHJlc3NDaGFuZ2VcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwib25TaGlwcGluZ0NoYW5nZVwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJvblNoaXBwaW5nT3B0aW9uc0NoYW5nZVwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJwYWdlVHlwZVwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJwYXJ0bmVyQXR0cmlidXRpb25JRFwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJwYXltZW50TWV0aG9kTm9uY2VcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwicGF5bWVudE1ldGhvZFRva2VuXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcInBheW1lbnRSZXF1ZXN0XCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcInBsYXRmb3JtXCI6XCJkZXNrdG9wXCIsXCJyZWZlcnJlckRvbWFpblwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJyZW1lbWJlclwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkX2IwYjY4ZjNhY2NfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcInJlbWVtYmVyXCJ9fSxcInJlbWVtYmVyZWRcIjpbXSxcInJlbmRlcmVkQnV0dG9uc1wiOltcInBheXBhbFwiXSxcInNlc3Npb25JRFwiOlwidWlkXzFkMmU4ODdmZDFfbXRpNm5keTZtamVcIixcInNka0NvcnJlbGF0aW9uSURcIjpcImYzNzAwMzNiOGU2YjdcIixcInNlc3Npb25TdGF0ZVwiOntcImdldFwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzBlN2ZiMDY1ZmFfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcImdldFwifX0sXCJzZXRcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF9lMWIyZDU3MTYxX210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJzZXRcIn19fSxcInN0YWdlSG9zdFwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJzdG9yYWdlSURcIjpcInVpZF9jOTg2OWFlOWE3X210aTZuZHk2bWplXCIsXCJzdG9yYWdlU3RhdGVcIjp7XCJnZXRcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF9lOGQ0YThmMTljX210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJnZXRcIn19LFwic2V0XCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfNzFiZWJhZWYxOF9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwic2V0XCJ9fX0sXCJzdXBwb3J0ZWROYXRpdmVCcm93c2VyXCI6ZmFsc2UsXCJzdXBwb3J0c1BvcHVwc1wiOnRydWUsXCJ0ZXN0XCI6e1wiYWN0aW9uXCI6XCJjaGVja291dFwifSxcInVzZXJFeHBlcmllbmNlRmxvd1wiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJ1c2VySURUb2tlblwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJ2YXVsdFwiOmZhbHNlLFwid2FsbGV0XCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifX0sXCJleHBvcnRzXCI6e1wiaW5pdFwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzFiNGVhODUyZDlfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcImluaXRcIn19LFwiY2xvc2VcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF9mNTg3N2U5ZjFhX210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJjbG9zZTo6bWVtb2l6ZWRcIn19LFwiY2hlY2tDbG9zZVwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkX2Y2ZDA5YTIxOGVfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcImNoZWNrQ2xvc2VcIn19LFwicmVzaXplXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfOGNiOGZjNTZiNF9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwiX25cIn19LFwib25FcnJvclwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzk1NmQzMDM1ZWFfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcInFuXCJ9fSxcInNob3dcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF9mZmEwMjg3NmM1X210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJnblwifX0sXCJoaWRlXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfNmQxYjU0MmIwNV9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwidm5cIn19LFwiZXhwb3J0XCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfNGY5NDQ0MjYzOF9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwiV25cIn19fX0ifX0__"]').getByRole('link', { name: 'PayPal' }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent('popup');
  await page.frameLocator('iframe[name="__zoid__paypal_buttons__eyJzZW5kZXIiOnsiZG9tYWluIjoiaHR0cHM6Ly9zdXN0aWNrZXQtbWFpbi52ZXJjZWwuYXBwIn0sIm1ldGFEYXRhIjp7IndpbmRvd1JlZiI6eyJ0eXBlIjoicGFyZW50IiwiZGlzdGFuY2UiOjB9fSwicmVmZXJlbmNlIjp7InR5cGUiOiJyYXciLCJ2YWwiOiJ7XCJ1aWRcIjpcInpvaWQtcGF5cGFsLWJ1dHRvbnMtdWlkXzlmMzBiMWQzNWFfbXRpNm5keTZtamVcIixcImNvbnRleHRcIjpcImlmcmFtZVwiLFwidGFnXCI6XCJwYXlwYWwtYnV0dG9uc1wiLFwiY2hpbGREb21haW5NYXRjaFwiOntcIl9fdHlwZV9fXCI6XCJyZWdleFwiLFwiX192YWxfX1wiOlwiXFxcXC5wYXlwYWxcXFxcLihjb218Y24pKDpcXFxcZCspPyRcIn0sXCJ2ZXJzaW9uXCI6XCIxMF8zXzNcIixcInByb3BzXCI6e1wic3R5bGVcIjp7XCJsYWJlbFwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJsYXlvdXRcIjpcInZlcnRpY2FsXCIsXCJjb2xvclwiOlwiZ29sZFwiLFwic2hhcGVcIjpcInJlY3RcIixcInRhZ2xpbmVcIjpmYWxzZSxcImhlaWdodFwiOjQwLFwicGVyaW9kXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcIm1lbnVQbGFjZW1lbnRcIjpcImJlbG93XCIsXCJkaXNhYmxlTWF4V2lkdGhcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiYm9yZGVyUmFkaXVzXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifX0sXCJjcmVhdGVPcmRlclwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkX2RkNWMzOWQzNTRfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcImNyZWF0ZU9yZGVyXCJ9fSxcIm9uQXBwcm92ZVwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzU4ZjZjMjVmOGRfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcIm9uQXBwcm92ZVwifX0sXCJvbkNhbmNlbFwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzJlNzc0ZTIxYmVfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcIm9uQ2FuY2VsXCJ9fSxcImNzcE5vbmNlXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcImFsbG93QmlsbGluZ1BheW1lbnRzXCI6dHJ1ZSxcImFtb3VudFwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJhcGlTdGFnZUhvc3RcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiYXBwbGVQYXlcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiYXBwbGVQYXlTdXBwb3J0XCI6ZmFsc2UsXCJicmFuZGVkXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcImJ1dHRvbkxvY2F0aW9uXCI6XCJzdXN0aWNrZXQtbWFpbi52ZXJjZWwuYXBwXCIsXCJidXR0b25TZXNzaW9uSURcIjpcInVpZF83ZjE1MWRjYTEwX210aTZuZHk2bWplXCIsXCJidXR0b25TaXplXCI6XCJodWdlXCIsXCJidXllckNvdW50cnlcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiY2xpZW50QWNjZXNzVG9rZW5cIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiY3VzdG9tZXJJZFwiOlwiXCIsXCJjbGllbnRJRFwiOlwiQVFZb1EtT3B6cHpTZkloWmN6LWlhc25KNkdVRUJBdms4MThGUWY0Snl1aGFzcVRrdk1MaFZwNGRQYTlVWElia1o5VzBxdmRYTVJhMnVfZHZcIixcImNsaWVudE1ldGFkYXRhSURcIjpcInVpZF8xZDJlODg3ZmQxX210aTZuZHk2bWplXCIsXCJjb21taXRcIjp0cnVlLFwiY29tcG9uZW50c1wiOltcImJ1dHRvbnNcIl0sXCJjcmVhdGVCaWxsaW5nQWdyZWVtZW50XCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcImNyZWF0ZVN1YnNjcmlwdGlvblwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJjcmVhdGVWYXVsdFNldHVwVG9rZW5cIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiY3NwXCI6e1wibm9uY2VcIjpcIlwifSxcImN1cnJlbmN5XCI6XCJVU0RcIixcImRlYnVnXCI6ZmFsc2UsXCJkaXNhYmxlQ2FyZFwiOltdLFwiZGlzYWJsZUZ1bmRpbmdcIjpbXCJjcmVkaXRcIixcImNhcmRcIl0sXCJkaXNhYmxlU2V0Q29va2llXCI6dHJ1ZSxcImRpc3BsYXlPbmx5XCI6W10sXCJlbmFibGVGdW5kaW5nXCI6W10sXCJlbmFibGVUaHJlZURvbWFpblNlY3VyZVwiOmZhbHNlLFwiZW5hYmxlVmF1bHRcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiZW52XCI6XCJzYW5kYm94XCIsXCJleHBlcmltZW50XCI6e1wiZW5hYmxlVmVubW9cIjpmYWxzZX0sXCJleHBlcmltZW50YXRpb25cIjp7fSxcImZsb3dcIjpcInB1cmNoYXNlXCIsXCJmdW5kaW5nRWxpZ2liaWxpdHlcIjp7XCJwYXlwYWxcIjp7XCJlbGlnaWJsZVwiOnRydWUsXCJ2YXVsdGFibGVcIjp0cnVlfSxcInBheWxhdGVyXCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhdWx0YWJsZVwiOmZhbHNlLFwicHJvZHVjdHNcIjp7XCJwYXlJbjNcIjp7XCJlbGlnaWJsZVwiOmZhbHNlLFwidmFyaWFudFwiOm51bGx9LFwicGF5SW40XCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhcmlhbnRcIjpudWxsfSxcInBheWxhdGVyXCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhcmlhbnRcIjpudWxsfX19LFwiY2FyZFwiOntcImVsaWdpYmxlXCI6ZmFsc2UsXCJicmFuZGVkXCI6dHJ1ZSxcImluc3RhbGxtZW50c1wiOmZhbHNlLFwidmVuZG9yc1wiOntcInZpc2FcIjp7XCJlbGlnaWJsZVwiOnRydWUsXCJ2YXVsdGFibGVcIjp0cnVlfSxcIm1hc3RlcmNhcmRcIjp7XCJlbGlnaWJsZVwiOnRydWUsXCJ2YXVsdGFibGVcIjp0cnVlfSxcImFtZXhcIjp7XCJlbGlnaWJsZVwiOnRydWUsXCJ2YXVsdGFibGVcIjp0cnVlfSxcImRpc2NvdmVyXCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhdWx0YWJsZVwiOnRydWV9LFwiaGlwZXJcIjp7XCJlbGlnaWJsZVwiOmZhbHNlLFwidmF1bHRhYmxlXCI6ZmFsc2V9LFwiZWxvXCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhdWx0YWJsZVwiOnRydWV9LFwiamNiXCI6e1wiZWxpZ2libGVcIjp0cnVlLFwidmF1bHRhYmxlXCI6dHJ1ZX0sXCJtYWVzdHJvXCI6e1wiZWxpZ2libGVcIjp0cnVlLFwidmF1bHRhYmxlXCI6dHJ1ZX0sXCJkaW5lcnNcIjp7XCJlbGlnaWJsZVwiOnRydWUsXCJ2YXVsdGFibGVcIjp0cnVlfSxcImN1cFwiOntcImVsaWdpYmxlXCI6dHJ1ZSxcInZhdWx0YWJsZVwiOnRydWV9fSxcImd1ZXN0RW5hYmxlZFwiOmZhbHNlfSxcInZlbm1vXCI6e1wiZWxpZ2libGVcIjpmYWxzZSxcInZhdWx0YWJsZVwiOmZhbHNlfSxcIml0YXVcIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcImNyZWRpdFwiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwiYXBwbGVwYXlcIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcInNlcGFcIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcImlkZWFsXCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJiYW5jb250YWN0XCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJnaXJvcGF5XCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJlcHNcIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcInNvZm9ydFwiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwibXliYW5rXCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJwMjRcIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcIndlY2hhdHBheVwiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwicGF5dVwiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwiYmxpa1wiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwidHJ1c3RseVwiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwib3h4b1wiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwiYm9sZXRvXCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJib2xldG9iYW5jYXJpb1wiOntcImVsaWdpYmxlXCI6ZmFsc2V9LFwibWVyY2Fkb3BhZ29cIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcIm11bHRpYmFuY29cIjp7XCJlbGlnaWJsZVwiOmZhbHNlfSxcInNhdGlzcGF5XCI6e1wiZWxpZ2libGVcIjpmYWxzZX0sXCJwYWlkeVwiOntcImVsaWdpYmxlXCI6ZmFsc2V9fSxcImZ1bmRpbmdTb3VyY2VcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwiZ2V0UGFnZVVybFwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzVhODI4MjUwYWZfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcImdldFBhZ2VVcmxcIn19LFwiZ2V0UG9wdXBCcmlkZ2VcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF84YzY3MGIwZTdhX210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJnZXRQb3B1cEJyaWRnZVwifX0sXCJnZXRQcmVyZW5kZXJEZXRhaWxzXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfZjg0NjU0OTM3N19tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwiZ2V0UHJlcmVuZGVyRGV0YWlsc1wifX0sXCJnZXRRdWVyaWVkRWxpZ2libGVGdW5kaW5nXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfYzcxYzVkYzNiNF9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwiZ2V0UXVlcmllZEVsaWdpYmxlRnVuZGluZ1wifX0sXCJob3N0ZWRCdXR0b25JZFwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJpbnRlbnRcIjpcImNhcHR1cmVcIixcImpzU2RrTGlicmFyeVwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJsb2NhbGVcIjp7XCJjb3VudHJ5XCI6XCJVU1wiLFwibGFuZ1wiOlwiZW5cIn0sXCJtZXJjaGFudElEXCI6W10sXCJtZXJjaGFudFJlcXVlc3RlZFBvcHVwc0Rpc2FibGVkXCI6ZmFsc2UsXCJtZXNzYWdlXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcIm5vbmNlXCI6XCJcIixcIm9uQ2xpY2tcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwib25Db21wbGV0ZVwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJvbkluaXRcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF8wNTQwNjZiMmYwX210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJvbkluaXRcIn19LFwib25NZXNzYWdlQ2xpY2tcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF8wYzIyMDk1Mjg2X210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJvbk1lc3NhZ2VDbGlja1wifX0sXCJvbk1lc3NhZ2VIb3ZlclwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzQyYzY3YmMwZTVfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcIm9uTWVzc2FnZUhvdmVyXCJ9fSxcIm9uTWVzc2FnZVJlYWR5XCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfMGIwMGI2YmMwYV9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwib25NZXNzYWdlUmVhZHlcIn19LFwib25TaGlwcGluZ0FkZHJlc3NDaGFuZ2VcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwib25TaGlwcGluZ0NoYW5nZVwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJvblNoaXBwaW5nT3B0aW9uc0NoYW5nZVwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJwYWdlVHlwZVwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJwYXJ0bmVyQXR0cmlidXRpb25JRFwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJwYXltZW50TWV0aG9kTm9uY2VcIjp7XCJfX3R5cGVfX1wiOlwidW5kZWZpbmVkXCJ9LFwicGF5bWVudE1ldGhvZFRva2VuXCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcInBheW1lbnRSZXF1ZXN0XCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifSxcInBsYXRmb3JtXCI6XCJkZXNrdG9wXCIsXCJyZWZlcnJlckRvbWFpblwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJyZW1lbWJlclwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkX2IwYjY4ZjNhY2NfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcInJlbWVtYmVyXCJ9fSxcInJlbWVtYmVyZWRcIjpbXSxcInJlbmRlcmVkQnV0dG9uc1wiOltcInBheXBhbFwiXSxcInNlc3Npb25JRFwiOlwidWlkXzFkMmU4ODdmZDFfbXRpNm5keTZtamVcIixcInNka0NvcnJlbGF0aW9uSURcIjpcImYzNzAwMzNiOGU2YjdcIixcInNlc3Npb25TdGF0ZVwiOntcImdldFwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzBlN2ZiMDY1ZmFfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcImdldFwifX0sXCJzZXRcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF9lMWIyZDU3MTYxX210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJzZXRcIn19fSxcInN0YWdlSG9zdFwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJzdG9yYWdlSURcIjpcInVpZF9jOTg2OWFlOWE3X210aTZuZHk2bWplXCIsXCJzdG9yYWdlU3RhdGVcIjp7XCJnZXRcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF9lOGQ0YThmMTljX210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJnZXRcIn19LFwic2V0XCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfNzFiZWJhZWYxOF9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwic2V0XCJ9fX0sXCJzdXBwb3J0ZWROYXRpdmVCcm93c2VyXCI6ZmFsc2UsXCJzdXBwb3J0c1BvcHVwc1wiOnRydWUsXCJ0ZXN0XCI6e1wiYWN0aW9uXCI6XCJjaGVja291dFwifSxcInVzZXJFeHBlcmllbmNlRmxvd1wiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJ1c2VySURUb2tlblwiOntcIl9fdHlwZV9fXCI6XCJ1bmRlZmluZWRcIn0sXCJ2YXVsdFwiOmZhbHNlLFwid2FsbGV0XCI6e1wiX190eXBlX19cIjpcInVuZGVmaW5lZFwifX0sXCJleHBvcnRzXCI6e1wiaW5pdFwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzFiNGVhODUyZDlfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcImluaXRcIn19LFwiY2xvc2VcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF9mNTg3N2U5ZjFhX210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJjbG9zZTo6bWVtb2l6ZWRcIn19LFwiY2hlY2tDbG9zZVwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkX2Y2ZDA5YTIxOGVfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcImNoZWNrQ2xvc2VcIn19LFwicmVzaXplXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfOGNiOGZjNTZiNF9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwiX25cIn19LFwib25FcnJvclwiOntcIl9fdHlwZV9fXCI6XCJjcm9zc19kb21haW5fZnVuY3Rpb25cIixcIl9fdmFsX19cIjp7XCJpZFwiOlwidWlkXzk1NmQzMDM1ZWFfbXRpNm5keTZtamVcIixcIm5hbWVcIjpcInFuXCJ9fSxcInNob3dcIjp7XCJfX3R5cGVfX1wiOlwiY3Jvc3NfZG9tYWluX2Z1bmN0aW9uXCIsXCJfX3ZhbF9fXCI6e1wiaWRcIjpcInVpZF9mZmEwMjg3NmM1X210aTZuZHk2bWplXCIsXCJuYW1lXCI6XCJnblwifX0sXCJoaWRlXCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfNmQxYjU0MmIwNV9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwidm5cIn19LFwiZXhwb3J0XCI6e1wiX190eXBlX19cIjpcImNyb3NzX2RvbWFpbl9mdW5jdGlvblwiLFwiX192YWxfX1wiOntcImlkXCI6XCJ1aWRfNGY5NDQ0MjYzOF9tdGk2bmR5Nm1qZVwiLFwibmFtZVwiOlwiV25cIn19fX0ifX0__"]').getByRole('link', { name: 'PayPal' }).click();
  const page2 = await page2Promise;
  await page4.locator('html').click({
    button: 'right'
  });
  await page4.getByPlaceholder('アドレスまたは携帯電話番号').click();
  await page4.locator('#login').click({
    button: 'right'
  });
  await page4.getByPlaceholder('アドレスまたは携帯電話番号').click();
  await page4.getByPlaceholder('アドレスまたは携帯電話番号').fill('sb-btbcj29716898@personal.example.com');
  await page4.getByRole('button', { name: '次へ' }).click();
  await page4.getByPlaceholder('パスワード').click();
  await page4.getByPlaceholder('パスワード').fill('QA8@1CyX');
  await page4.getByRole('button', { name: 'ログイン' }).click();
  await page4.getByTestId('app-index').click();
  await page4.getByTestId('BALANCEUSD-fi-display').locator('circle').click();
  await page4.locator('label').filter({ hasText: 'PayPal余额' }).locator('svg').click();
  await page4.getByTestId('app-index').click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').click({
    clickCount: 3
  });
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').dblclick();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('5');
  await page.getByRole('spinbutton').press('Enter');
  await page.getByText('You have 50 coins. Do you want to use it? coins used.').click();
  await page.getByRole('heading', { name: 'Pay with' }).click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').click();
  await page.getByText('Pay with PayPal You have 50').click();
  await page.getByRole('spinbutton').click();
  await page.goto('chrome-error://chromewebdata/');
  await page.goto('https://susticket-main.vercel.app/');
  await page.locator('div:nth-child(7) > div > a').click();
  await page.getByText('3Cart').click();
  await page.getByRole('button', { name: 'Bookmark' }).click();
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