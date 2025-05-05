
const fs = require('fs');
const path = require('path');

const poolPath = path.join(__dirname, '../profiles/proxy-pool.json');

function getRandomProxy() {
  if (!fs.existsSync(poolPath)) return null;
  const pool = JSON.parse(fs.readFileSync(poolPath, 'utf8'));
  if (pool.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex].ip;
}

module.exports = { getRandomProxy };
