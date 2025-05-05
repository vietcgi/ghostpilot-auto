
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const queuePath = path.join(__dirname, '../logs/execution-log.json');

function runScript(scriptName, profile = 'sdk') {
  const logs = fs.existsSync(queuePath) ? JSON.parse(fs.readFileSync(queuePath)) : [];
  logs.push({
    scriptName,
    profile,
    timestamp: new Date().toISOString(),
    steps: [],
    status: 'queued'
  });
  fs.writeFileSync(queuePath, JSON.stringify(logs, null, 2));
  console.log(`✅ Script '${scriptName}' queued for profile '${profile}'`);
}

function scheduleScript(scriptName, intervalMin = 30) {
  const cmd = `echo "node runner.js ${scriptName}" | at now + ${intervalMin} minutes`;
  exec(cmd, (err) => {
    if (err) console.error('❌ Failed to schedule:', err.message);
    else console.log(`⏱ Script '${scriptName}' scheduled in ${intervalMin} minutes.`);
  });
}

function listScripts() {
  const file = path.join(__dirname, '../automation/scripts.json');
  const scripts = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
  return scripts.map(s => s.name);
}

module.exports = {
  runScript,
  scheduleScript,
  listScripts
};
