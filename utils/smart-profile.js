
const fs = require('fs');
const path = require('path');

const profilesPath = path.join(__dirname, '../profiles/store.json');
const scoresPath = path.join(__dirname, '../logs/fingerprint-scores.json');

function selectSmartProfile(domain) {
  const encryptedData = fs.readFileSync(profilesPath, 'utf8');
  const crypto = require('crypto');
  const key = Buffer.from('ghostpilotkey123');
  const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
  decipher.setAutoPadding(false);

  function unpad(data) {
    const padLen = data.charCodeAt(data.length - 1);
    return data.slice(0, -padLen);
  }

  const decryptedJson = unpad(Buffer.concat([
    decipher.update(Buffer.from(encryptedData, 'base64')),
    decipher.final()
  ]).toString('utf8'));

  const profiles = JSON.parse(decryptedJson);
  const scores = fs.existsSync(scoresPath) ? JSON.parse(fs.readFileSync(scoresPath)) : [];

  const matchDomain = (profile, domain) =>
    profile.email?.includes(domain) || profile.name?.includes(domain);

  const best = Object.values(profiles)
    .map(p => {
      const fp = scores.find(f => f.userAgent && p.fingerprint && f.userAgent.includes(p.fingerprint));
      const score = fp?.stealthScore || 70;
      return { ...p, score };
    })
    .filter(p => matchDomain(p, domain))
    .sort((a, b) => b.score - a.score)[0];

  return best || null;
}

module.exports = { selectSmartProfile };
