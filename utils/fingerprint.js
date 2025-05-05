
const fs = require('fs');
const path = require('path');

const fingerprintPool = JSON.parse(fs.readFileSync(path.join(__dirname, '../profiles/fingerprint-pool.json'), 'utf8'));

function getRandomFingerprint() {
  return fingerprintPool[Math.floor(Math.random() * fingerprintPool.length)];
}

async function injectFingerprint(page) {
  const fp = getRandomFingerprint();

  await page.setUserAgent(fp.userAgent);

  await page.evaluateOnNewDocument((fp) => {
    Object.defineProperty(navigator, 'language', { get: () => fp.language });
    Object.defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
      value: () => ({ timeZone: fp.timezone })
    });

    Object.defineProperty(screen, 'width', { get: () => fp.screen.width });
    Object.defineProperty(screen, 'height', { get: () => fp.screen.height });
  }, fp);
}

module.exports = { injectFingerprint };
