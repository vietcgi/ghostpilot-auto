
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const { runAutomation } = require('../automation/runner');
const { injectFingerprint } = require('../utils/fingerprint');
const { getRandomProxy } = require('../utils/proxy-rotation');

const queuePath = path.join(__dirname, '../server/task-queue.json');

function getNextTask() {
  if (!fs.existsSync(queuePath)) return null;
  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  return queue.tasks.length ? queue.tasks.shift() : null;
}

function saveQueue(queue) {
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
}

function loadProfile(profileId) {
  const encryptedData = fs.readFileSync(path.join(__dirname, '../profiles/store.json'), 'utf8');
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
  return profiles[profileId] || null;
}

async function runWorkerLoop() {
  console.log("👷 Distributed worker started...");
  setInterval(async () => {
    const queue = fs.existsSync(queuePath) ? JSON.parse(fs.readFileSync(queuePath)) : { tasks: [] };
    const task = getNextTask();

    if (!task) return;

    console.log("⚙️ Running task:", task.profileId);

    const profile = loadProfile(task.profileId);
    if (!profile) return console.error("❌ Profile not found:", task.profileId);

    let proxy = profile.proxy || getRandomProxy();

    try {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser', // or your path
        args: proxy ? [`--proxy-server=${proxy}`] : [],
        userDataDir: path.join(__dirname, `../profiles/${task.profileId}/browser-data`)
      });

      const page = await browser.newPage();
      await injectFingerprint(page);
      await runAutomation(page, profile);
      await browser.close();

      console.log(`✅ Task for ${task.profileId} complete.`);
    } catch (err) {
      console.error("❌ Worker error:", err);
    }

    saveQueue(queue); // Save updated queue (with task removed)
  }, 5000);
}

runWorkerLoop();
