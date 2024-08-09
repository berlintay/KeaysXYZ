const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.WEBSITE_URL);
  const screenshot = await page.screenshot({ fullPage: true });

  fs.writeFileSync('screenshot.png', screenshot);
  await browser.close();
})();
