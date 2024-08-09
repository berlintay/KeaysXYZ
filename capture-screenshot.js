const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.WEBSITE_URL);
  const screenshot = await page.screenshot({ fullPage: true });

  // Define the path to the media directory
  const mediaDir = path.join(__dirname, 'media');

  // Ensure the media directory exists
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir);
  }

  // Save the screenshot in the media directory
  fs.writeFileSync(path.join(mediaDir, 'screenshot.png'), screenshot);
  await browser.close();
})();
