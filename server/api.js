
const express = require('express');
const fs = require('fs');
const path = require('path');
const { launchProfile } = require('../main'); // simulate triggering from main

const app = express();
const PORT = 4000;

app.use(express.json());

// GET all profiles
app.get('/profiles', (req, res) => {
  const storePath = path.join(__dirname, '../profiles/store.json');
  const encryptedData = fs.readFileSync(storePath, 'utf8');
  res.send({ data: encryptedData });
});

// LAUNCH profile
app.post('/launch-profile', (req, res) => {
  const { profileId } = req.body;
  if (!profileId) {
    return res.status(400).json({ error: 'Missing profileId' });
  }
  // In real integration, you'd call the launchProfile function here
  console.log('Simulating profile launch:', profileId);
  res.json({ status: 'Launch triggered for ' + profileId });
});

// GET logs
app.get('/logs', (req, res) => {
  const logPath = path.join(__dirname, '../logs/activity.json');
  const logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
  res.json(logs);
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 GhostPilot API server running at http://localhost:${PORT}`);
});
