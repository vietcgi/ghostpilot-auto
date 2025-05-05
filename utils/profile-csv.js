
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const csv = require('csv-parser');
const { parse } = require('json2csv');

const PROFILE_PATH = path.join(__dirname, '../profiles/store.json');
const encryptionKey = Buffer.from('ghostpilotkey123');

function pad(str) {
  const padLen = 16 - (str.length % 16);
  return str + String.fromCharCode(padLen).repeat(padLen);
}

function unpad(str) {
  const padLen = str.charCodeAt(str.length - 1);
  return str.slice(0, -padLen);
}

function encryptData(text, key) {
  const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
  cipher.setAutoPadding(false);
  return Buffer.concat([cipher.update(pad(text)), cipher.final()]).toString('base64');
}

function decryptData(base64, key) {
  const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
  decipher.setAutoPadding(false);
  return unpad(Buffer.concat([decipher.update(Buffer.from(base64, 'base64')), decipher.final()]).toString());
}

function exportToCSV(outputPath) {
  const encryptedData = fs.readFileSync(PROFILE_PATH, 'utf8');
  const decrypted = decryptData(encryptedData, encryptionKey);
  const profiles = JSON.parse(decrypted);
  const data = Object.values(profiles);
  const csvData = parse(data);
  fs.writeFileSync(outputPath, csvData);
  console.log('Profiles exported to', outputPath);
}

function importFromCSV(csvPath) {
  const profiles = {};
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => {
      profiles[row.name] = row;
    })
    .on('end', () => {
      const encrypted = encryptData(JSON.stringify(profiles), encryptionKey);
      fs.writeFileSync(PROFILE_PATH, encrypted);
      console.log('Profiles imported from CSV.');
    });
}

// Example usage:
// exportToCSV('exported_profiles.csv');
// importFromCSV('imported_profiles.csv');

module.exports = {
  exportToCSV,
  importFromCSV
};
