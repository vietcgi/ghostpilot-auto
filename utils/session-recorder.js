
const fs = require('fs');
const path = require('path');

async function recordStepSnapshot(page, label) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const base = path.join(__dirname, '../logs/session-replays');
  if (!fs.existsSync(base)) fs.mkdirSync(base, { recursive: true });

  const html = await page.content();
  const fileBase = path.join(base, `${label}-${ts}`);

  fs.writeFileSync(fileBase + '.html', html);
  await page.screenshot({ path: fileBase + '.png' });

  console.log(`📸 Snapshot saved: ${label}`);
}

module.exports = { recordStepSnapshot };
