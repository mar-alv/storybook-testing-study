import { defineConfig, devices } from "@playwright/test";

const appUrl = "http://localhost:3000";
const storybookUrl = "http://localhost:6006";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  expect: {
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
  projects: [
    {
      name: "app-desktop",
      testMatch: "app/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: appUrl },
    },
    {
      name: "app-mobile",
      testMatch: "app/**/*.spec.ts",
      use: { ...devices["Pixel 7"], baseURL: appUrl },
    },
    {
      name: "storybook",
      testMatch: "storybook/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: storybookUrl },
    },
  ],
  webServer: [
    {
      command: "npm run dev",
      url: appUrl,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: "npx storybook dev -p 6006 --ci",
      url: storybookUrl,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
    },
  ],
});
