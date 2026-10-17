import { expect, test } from '@playwright/test';
import { openStory } from '../support/storybook';

const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

const stories = [
  'pokemon-pokemoncard--default',
  'pokemon-pokemongrid--default',
  'pokemon-pokemondetailview--default',
  'pokemon-pokedex--default',
];

for (const [viewportName, size] of Object.entries(viewports)) {
  test.describe(viewportName, () => {
    test.use({ viewport: size });

    for (const id of stories) {
      test(`${id} matches the snapshot`, async ({ page }) => {
        await openStory(page, id);
        await page.evaluate(() =>
          Promise.all(Array.from(document.images).map((image) => image.decode().catch(() => undefined))),
        );

        await expect(page).toHaveScreenshot(`${id}-${viewportName}.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      });
    }
  });
}
