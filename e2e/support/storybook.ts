import type { Page } from '@playwright/test';

export async function openStory(page: Page, id: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story`);
  await page.waitForSelector('body.sb-show-main');
  await page.waitForLoadState('networkidle');
}
