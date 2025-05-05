
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const poolPath = path.join(__dirname, '../profiles/fingerprint-pool.json');
const scoreLogPath = path.join(__dirname, '../logs/stealth-scores.json');

async function testFingerprint(fp, index) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.setUserAgent(fp.userAgent);
    await page.setViewport(fp.screen);
    await page.goto('https://bot.incolumitas.com/', { waitUntil: 'networkidle2' });

    const content = await page.content();
    const flags = ['WebDriver', 'Headless', 'Detected', 'Automation'];
    const score = flags.reduce((acc, flag) => acc + (content.includes(flag) ? 1 : 0), 0);

    await browser.close();
    return { id: index, score, fingerprint: fp };

  } catch (err) {
    await browser.close();
    return { id: index, score: -1, error: err.message };
  }
}

async function runBenchmark() {
  const pool = JSON.parse(fs.readFileSync(poolPath));
  const results = [];

  for (let i = 0; i < pool.length; i++) {
    const result = await testFingerprint(pool[i], i);
    results.push(result);
  }

  fs.writeFileSync(scoreLogPath, JSON.stringify(results, null, 2));
  console.log(`📊 Stealth Score Benchmark complete: ${results.length} tested.`);
}

runBenchmark();
