const puppeteer = require('puppeteer');


async function captureScreenshot(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(url);

  await new Promise(resolve => setTimeout(resolve, 15000));
  
  await page.screenshot({ path: 'media/screenshot.png' });
  
  await browser.close();
}

captureScreenshot('http://www.keays.xyz');
