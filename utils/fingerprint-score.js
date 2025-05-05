
const fs = require('fs');
const path = require('path');

const poolPath = path.join(__dirname, '../profiles/fingerprint-pool.json');
const scorePath = path.join(__dirname, '../logs/fingerprint-scores.json');

function scoreFingerprint(fp) {
  let score = 100;

  // Simulate scoring heuristics
  if (!fp.userAgent.includes("Chrome")) score -= 20;
  if (fp.language !== "en-US" && fp.language !== "en-GB") score -= 10;
  if (fp.screen.width < 1280 || fp.screen.height < 720) score -= 10;
  if (!fp.timezone.includes("America") && !fp.timezone.includes("Europe")) score -= 10;

  return Math.max(score, 0);
}

function runFingerprintScoring() {
  const fingerprints = JSON.parse(fs.readFileSync(poolPath, 'utf8'));
  const results = fingerprints.map(fp => {
    return {
      ...fp,
      stealthScore: scoreFingerprint(fp)
    };
  });

  fs.writeFileSync(scorePath, JSON.stringify(results, null, 2));
  console.log('✅ Fingerprint scoring complete. Output saved to fingerprint-scores.json');
}

runFingerprintScoring();
