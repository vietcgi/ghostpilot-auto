
const puppeteer = require('puppeteer-extra');
const { applyBehavioralAutomation } = require('../utils/behavioral');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

module.exports.runAutomation = async (page, profileConfig) => {
  const email = profileConfig.email;
  const password = profileConfig.password;

  try {
    if (profileConfig.name.includes('gmail')) {
      await page.goto('https://accounts.google.com/signin', { waitUntil: 'domcontentloaded' });
      await page.type('input[type="email"]', email);
      await page.click('#identifierNext');
      await page.waitForTimeout(2000);
      await page.type('input[type="password"]', password);
      await page.click('#passwordNext');
      await page.waitForTimeout(5000);
      await page.screenshot({ path: 'gmail-login-success.png' });
      console.log('Gmail login script completed.');
    } else if (profileConfig.name.includes('hotmail')) {
      await page.goto('https://login.live.com/', { waitUntil: 'domcontentloaded' });
      await page.type('input[type="email"]', email);
      await page.click('input[type="submit"]');
      await page.waitForTimeout(2000);
      await page.type('input[type="password"]', password);
      await page.click('input[type="submit"]');
      await page.waitForTimeout(5000);
      await page.screenshot({ path: 'hotmail-login-success.png' });
      console.log('Hotmail login script completed.');
    } else if (profileConfig.name.includes('facebook')) {
      await page.goto('https://facebook.com', { waitUntil: 'domcontentloaded' });
      await page.type('#email', email, { delay: 50 });
      await page.type('#pass', password, { delay: 50 });
      await Promise.all([
        page.click('[name="login"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' })
      ]);
      await page.screenshot({ path: 'facebook-login-success.png' });
      console.log('Facebook login script completed.');
    } else {
      console.log('No automation configured for this profile.');
    }
  } catch (err) {
    console.error('Automation failed:', err);
  }
};
