// screenshot.mjs — Automated screenshot for QA workflow
// Usage: node screenshot.mjs http://localhost:3000 section-name
// Output: screenshots/screenshot-N-section-name.png
//
// FIRST-TIME SETUP:
// 1. Install Puppeteer: npm install puppeteer
// 2. Update CHROME_PATH below if Puppeteer can't find Chrome automatically.
//    Windows typical: C:/Program Files/Google/Chrome/Application/chrome.exe
//    Mac typical:     /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
//    Linux typical:   /usr/bin/google-chrome

import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

// Set to null for auto-detection, or provide your Chrome/Chromium path:
const CHROME_PATH = null;

const VIEWPORT_DESKTOP = { width: 1440, height: 900 };
const VIEWPORT_MOBILE  = { width: 390,  height: 844 };

async function takeScreenshot(url, label) {
  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

  // Auto-increment screenshot number
  const existing = fs.readdirSync(screenshotsDir)
    .filter(f => f.startsWith('screenshot-'))
    .map(f => parseInt(f.split('-')[1], 10))
    .filter(n => !isNaN(n));
  const nextNum = existing.length > 0 ? Math.max(...existing) + 1 : 1;

  const launchOptions = {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  if (CHROME_PATH) launchOptions.executablePath = CHROME_PATH;

  const browser = await puppeteer.launch(launchOptions);

  try {
    // Desktop screenshot
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport(VIEWPORT_DESKTOP);
    await desktopPage.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500)); // Allow animations to settle

    const desktopFile = `screenshot-${nextNum}-${label}-desktop.png`;
    await desktopPage.screenshot({
      path: path.join(screenshotsDir, desktopFile),
      fullPage: true,
    });
    console.log(`  ✓ Desktop: screenshots/${desktopFile}`);

    // Mobile screenshot
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport(VIEWPORT_MOBILE);
    await mobilePage.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));

    const mobileFile = `screenshot-${nextNum}-${label}-mobile.png`;
    await mobilePage.screenshot({
      path: path.join(screenshotsDir, mobileFile),
      fullPage: true,
    });
    console.log(`  ✓ Mobile:  screenshots/${mobileFile}`);

  } finally {
    await browser.close();
  }
}

// CLI entry
const [,, url, label] = process.argv;
if (!url || !label) {
  console.error('\n  Usage: node screenshot.mjs <url> <section-label>');
  console.error('  Example: node screenshot.mjs http://localhost:3000 hero\n');
  process.exit(1);
}

takeScreenshot(url, label).catch(err => {
  console.error('Screenshot failed:', err.message);
  process.exit(1);
});
