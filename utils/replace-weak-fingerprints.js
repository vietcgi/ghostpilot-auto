
const fs = require('fs');
const path = require('path');

const poolPath = path.join(__dirname, '../profiles/fingerprint-pool.json');
const scorePath = path.join(__dirname, '../logs/fingerprint-scores.json');

function regenerateFingerprint() {
  const resolutions = [
    { width: 1920, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 }
  ];
  const languages = ['en-US', 'en-GB'];
  const timezones = ['America/New_York', 'Europe/London'];

  return {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36",
    screen: resolutions[Math.floor(Math.random() * resolutions.length)],
    language: languages[Math.floor(Math.random() * languages.length)],
    timezone: timezones[Math.floor(Math.random() * timezones.length)]
  };
}

function replaceWeakFingerprints(threshold = 70) {
  const scored = JSON.parse(fs.readFileSync(scorePath));
  const newPool = scored.map(fp => {
    return fp.stealthScore < threshold ? regenerateFingerprint() : fp;
  });

  fs.writeFileSync(poolPath, JSON.stringify(newPool, null, 2));
  console.log(`✅ Replaced fingerprints with scores under ${threshold}`);
}

replaceWeakFingerprints();
