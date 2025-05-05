
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../src/ui')));
const addProfileRoute = require('./add-profile-route');
app.use('/', addProfileRoute);

// Basic POST handler for script uploads/updates
app.post('/automation/:file', (req, res) => {
  const outPath = path.join(__dirname, '../automation', req.params.file);
  fs.writeFileSync(outPath, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ GhostPilot Hosted Admin running at http://localhost:${PORT}`);
});
