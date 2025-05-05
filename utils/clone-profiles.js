
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const storePath = path.join(__dirname, '../profiles/store.json');
const fingerprintPath = path.join(__dirname, '../profiles/fingerprint-pool.json');
const outputPath = path.join(__dirname, '../profiles/cloned-profiles.json');

function tweakFingerprint(fp) {
  const resolutions = [
    { width: 1920, height: 1080 },
    { width: 1600, height: 900 },
    { width: 1366, height: 768 }
  ];
  const timezones = ['America/New_York', 'Europe/Berlin', 'Asia/Tokyo'];

  return {
    ...fp,
    screen: resolutions[Math.floor(Math.random() * resolutions.length)],
    timezone: timezones[Math.floor(Math.random() * timezones.length)],
    language: fp.language,
    userAgent: fp.userAgent
  };
}

function cloneProfiles(count = 3) {
  const originalStore = JSON.parse(fs.readFileSync(storePath));
  const fingerprints = JSON.parse(fs.readFileSync(fingerprintPath));
  const clones = [];

  for (let i = 0; i < count; i++) {
    const base = originalStore[Math.floor(Math.random() * originalStore.length)];
    const fp = tweakFingerprint(fingerprints[Math.floor(Math.random() * fingerprints.length)]);
    const id = crypto.randomBytes(4).toString('hex');
    clones.push({
      ...base,
      id: `clone-${id}`,
      fingerprint: fp,
      name: `Cloned ${base.name} (${id})`
    });
  }

  fs.writeFileSync(outputPath, JSON.stringify(clones, null, 2));
  console.log(`🌀 Created ${count} cloned profiles.`);
}

cloneProfiles(5);
