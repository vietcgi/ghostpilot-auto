
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());

app.post('/webhook/:script', (req, res) => {
  const scriptName = req.params.script;
  const profile = req.body.profile || 'default-profile';

  const logEntry = {
    scriptName,
    profile,
    timestamp: new Date().toISOString(),
    steps: [],
    status: 'queued'
  };

  const logPath = path.join(__dirname, '../logs/execution-log.json');
  const logs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath)) : [];
  logs.push(logEntry);
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

  console.log(`📡 Webhook received: ${scriptName} for profile ${profile}`);
  res.json({ success: true, message: `Script '${scriptName}' triggered.` });
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook listener running at http://localhost:${PORT}`);
});
