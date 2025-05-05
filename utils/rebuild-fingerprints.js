
const fs = require('fs');
const path = require('path');

const scorePath = path.join(__dirname, '../logs/fingerprint-scores.json');
const poolPath = path.join(__dirname, '../profiles/fingerprint-pool.json');

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

function rebuildWeakFingerprints(threshold = 60) {
  const scores = JSON.parse(fs.readFileSync(scorePath));
  let pool = JSON.parse(fs.readFileSync(poolPath));

  const rebuilt = pool.map((fp, i) => {
    const s = scores[i]?.stealthScore || 70;
    return s < threshold ? regenerateFingerprint() : fp;
  });

  fs.writeFileSync(poolPath, JSON.stringify(rebuilt, null, 2));
  console.log(`🔄 Rebuilt ${rebuilt.filter((fp, i) => scores[i]?.stealthScore < threshold).length} fingerprints.`);
}

rebuildWeakFingerprints();
