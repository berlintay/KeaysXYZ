            import puppeteer from 'puppeteer';

            
            async function captureScreenshot(url) {
              const browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                headless: true,
              });
              const page = await browser.newPage();

              try {
                await page.goto(url, { waitUntil: 'networkidle0' });
                await page.screenshot({ path: 'media/screenshot.png', fullPage: true });
              } catch (error) {
                console.error('Error capturing screenshot:', error);
              } finally {
                await browser.close();
              }
            }
