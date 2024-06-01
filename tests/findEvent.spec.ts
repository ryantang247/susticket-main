import { test, expect } from '@playwright/test';
//adjust map zoom in-out -> locator position may not hv icon -> no pop up 
test('test', async ({ page }) => {
  await page.goto('https://susticket-main.vercel.app/');
  await page.getByText('Hello, There!What event are').click();
  await page.getByRole('heading', { name: 'Hello, There!' }).click();
  await page.getByText('What event are you looking').click();
  await page.getByPlaceholder('Search event...').click();
  await page.getByRole('button', { name: 'Find event' }).click();
  await page.locator('canvas').click({
    position: {
      x: 157,
      y: 261
    }
  });
  await page.getByRole('dialog').locator('div').filter({ hasText: 'College of EngineeringPlace' }).first().click();
  await page.getByRole('heading', { name: 'College of Engineering' }).click();
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByRole('heading', { name: 'Place for Science Geek' }).click();
  await page.getByRole('heading', { name: 'Events occuring at this place:' }).click();
  await page.getByRole('link', { name: 'Badminton Exam' }).click();
  await page.locator('canvas').click({
    position: {
      x: 96,
      y: 361
    }
  });
  await page.getByRole('dialog').locator('div').filter({ hasText: 'College of EngineeringPlace' }).first().click();
  await page.getByRole('link', { name: 'dinner' }).click();
  await page.locator('canvas').click({
    position: {
      x: 325,
      y: 237
    }
  });
  await page.getByRole('dialog').locator('div').filter({ hasText: 'Swimming Pool 2Main Classroom' }).first().click();
  await page.getByRole('heading', { name: 'Swimming Pool' }).click();
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByRole('heading', { name: 'Main Classroom' }).click();
  await page.getByRole('heading', { name: 'Events occuring at this place:' }).click();
  await page.getByRole('link', { name: 'ANother fun event' }).click();
  await page.goto('https://susticket-main.vercel.app/map');
  await page.locator('canvas').click({
    position: {
      x: 325,
      y: 233
    }
  });
  await page.getByRole('dialog').locator('div').filter({ hasText: 'Swimming Pool 2Main Classroom' }).first().click();
  await page.getByRole('link', { name: 'TALK SHOW' }).click();
  await page.locator('canvas').click({
    position: {
      x: 396,
      y: 347
    }
  });
  await page.getByRole('dialog').locator('div').filter({ hasText: 'Swimming Pool 3Swimming Pool' }).first().click();
  await page.getByRole('heading', { name: 'Swimming Pool 3' }).click();
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByRole('heading', { name: 'Swimming Pool Next to Fengyu' }).click();
  await page.getByRole('heading', { name: 'Events occuring at this place:' }).click();
  await page.getByRole('link', { name: 'Sleeping Competition' }).click();
  await page.locator('canvas').click({
    position: {
      x: 520,
      y: 353
    }
  });
  await page.getByRole('dialog').locator('div').filter({ hasText: 'Faculty Apartment Basketball' }).first().click();
  await page.getByRole('heading', { name: 'Faculty Apartment Basketball' }).click();
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByRole('heading', { name: 'Rubberized Basketball Court' }).click();
  await page.getByRole('heading', { name: 'Events occuring at this place:' }).click();
  await page.getByRole('link', { name: 'Basketball Competition' }).click();
  await page.locator('canvas').click({
    position: {
      x: 606,
      y: 108
    }
  });
  await page.getByRole('dialog').locator('div').filter({ hasText: 'Football FieldFor football' }).first().click();
  await page.getByRole('heading', { name: 'Football Field' }).click();
  await page.getByRole('img', { name: '~/assets/noimage.png' }).click();
  await page.getByRole('heading', { name: 'For football lovers!' }).click();
  await page.getByRole('heading', { name: 'Events occuring at this place:' }).click();
  await page.getByRole('link', { name: 'Track Competition' }).click();
  await page.locator('canvas').click({
    position: {
      x: 734,
      y: 306
    }
  });
  await page.getByRole('dialog').locator('div').filter({ hasText: 'Football FieldFor football' }).first().click();
  await page.getByRole('link', { name: 'SUSTECH BADMINTON' }).click();
  await page.locator('canvas').click({
    position: {
      x: 760,
      y: 275
    }
  });
  await page.getByRole('dialog').locator('div').filter({ hasText: 'Football FieldFor football' }).first().click();
  await page.getByRole('link', { name: 'This event doesnt have' }).click();
  await page.locator('canvas').click({
    position: {
      x: 758,
      y: 269
    }
  });
  await page.getByRole('dialog').locator('div').filter({ hasText: 'Football FieldFor football' }).first().click();
  await page.getByRole('link', { name: 'Computer Science' }).click();
  await page.goto('https://susticket-main.vercel.app/events/60ec6f2c-7188-4d98-8900-246fa33b9d7d');
  await page.locator('.back').click();
  await page.getByRole('button', { name: 'Find event' }).click();
  await page.locator('.amap-layers').click();
  await page.getByText('+').click();
  await page.getByText('-', { exact: true }).click();
  await page.locator('.amap-pointers').click();
  await page.locator('.amap-pitchUp').click();
  await page.locator('.amap-pitchDown').click();
  await page.locator('.amap-rotateRight').click();
  await page.locator('.amap-rotateLeft').click();
});