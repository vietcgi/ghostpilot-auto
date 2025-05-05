
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const cmd = args[0];
const script = args[1];
const profile = args[2] || 'cli';

const logPath = path.join(__dirname, '../logs/execution-log.json');
const scriptsFile = path.join(__dirname, '../automation/scripts.json');

if (!cmd || !['run', 'schedule', 'list'].includes(cmd)) {
  console.log('Usage: ghost <run|schedule|list> <scriptName?> [profile]');
  process.exit(1);
}

if (cmd === 'list') {
  const scripts = JSON.parse(fs.readFileSync(scriptsFile));
  console.log('Available Scripts:');
  scripts.forEach(s => console.log('•', s.name));
  process.exit(0);
}

if (cmd === 'run') {
  const logs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath)) : [];
  logs.push({
    scriptName: script,
    profile,
    timestamp: new Date().toISOString(),
    steps: [],
    status: 'queued'
  });
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
  console.log(`✅ Queued '${script}' for profile '${profile}'`);
}

if (cmd === 'schedule') {
  const mins = parseInt(args[2] || '5');
  const queueLine = `node runner.js ${script}`;
  require('child_process').exec(`echo "${queueLine}" | at now + ${mins} minutes`, (err) => {
    if (err) return console.error('❌ Failed to schedule:', err.message);
    console.log(`⏱ Scheduled '${script}' in ${mins} minutes`);
  });
}
