
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const basePath = path.join(__dirname, '../profiles');

function getUserKey(username) {
  return crypto.createHash('sha256').update(username + '_ghostpilot').digest().slice(0, 16);
}

function encryptProfiles(username, profileData) {
  const key = getUserKey(username);
  const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
  cipher.setAutoPadding(true);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(profileData), 'utf8'),
    cipher.final()
  ]);
  fs.writeFileSync(path.join(basePath, `${username}.store`), encrypted.toString('base64'));
}

function decryptProfiles(username) {
  const key = getUserKey(username);
  const filePath = path.join(basePath, `${username}.store`);
  if (!fs.existsSync(filePath)) return null;

  const data = Buffer.from(fs.readFileSync(filePath, 'utf8'), 'base64');
  const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
  decipher.setAutoPadding(true);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return JSON.parse(decrypted.toString('utf8'));
}

module.exports = { encryptProfiles, decryptProfiles };
