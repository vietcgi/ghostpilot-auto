
const express = require('express');
const fs = require('fs');
const path = require('path');

const proxyPath = path.join(__dirname, '../profiles/proxies.json');

const router = express.Router();

router.get('/proxies', (req, res) => {
  if (!fs.existsSync(proxyPath)) return res.json([]);
  const proxies = JSON.parse(fs.readFileSync(proxyPath));
  res.json(proxies);
});

module.exports = router;
