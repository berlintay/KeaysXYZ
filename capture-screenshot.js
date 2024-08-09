const puppeteer = require('puppeteer');

async function waitForBoot(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let isReady = false;
  while (!isReady) {
    try {
      await page.goto(url);
      // Check if a specific element is present or page content is ready
      isReady = true;  // Replace with actual condition check
    } catch (error) {
      console.log('Not ready yet, retrying...');
      await new Promise(resolve => setTimeout(resolve, 30000));  // Wait for 30 seconds
    }
  }

  await page.screenshot({ path: 'media/screenshot.png' });
  await browser.close();
}

waitForBoot('http://www.keays.xyz');
