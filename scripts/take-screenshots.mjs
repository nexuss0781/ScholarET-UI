import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function capture() {
  const outputDir = path.resolve(process.cwd(), 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching Chromium...');
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  // 1. Desktop Mode (1440 x 900)
  console.log('Capturing Desktop Mode...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2, // Retina sharpness
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1500); // Allow SVG animations & fonts to settle
  const desktopPath = path.join(outputDir, 'desktop.png');
  await desktopPage.screenshot({ path: desktopPath, fullPage: false });
  console.log(`✓ Saved desktop screenshot: ${desktopPath}`);
  await desktopContext.close();

  // 2. Mobile Mode (iPhone 14: 390 x 844)
  console.log('Capturing Mobile Mode...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2, // Retina sharpness
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);
  const mobilePath = path.join(outputDir, 'mobile.png');
  await mobilePage.screenshot({ path: mobilePath, fullPage: false });
  console.log(`✓ Saved mobile screenshot: ${mobilePath}`);
  await mobileContext.close();

  await browser.close();
  console.log('🎉 Screenshots successfully generated!');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
