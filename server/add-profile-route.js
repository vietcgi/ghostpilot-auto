
const express = require('express');
const fs = require('fs');
const path = require('path');

const groupPath = path.join(__dirname, '../profiles/groups.json');
const profilePath = path.join(__dirname, '../profiles/store.json');

const router = express.Router();

// GET all groups
router.get('/groups', (req, res) => {
  if (!fs.existsSync(groupPath)) return res.json([]);
  const groups = JSON.parse(fs.readFileSync(groupPath));
  res.json(groups);
});

// Add profile and register group if needed
router.post('/add-profile', (req, res) => {
  try {
    const { name, proxy, userAgent, timezone, screen, group } = req.body;
    const profiles = fs.existsSync(profilePath) ? JSON.parse(fs.readFileSync(profilePath)) : [];
    const groups = fs.existsSync(groupPath) ? JSON.parse(fs.readFileSync(groupPath)) : [];

    const defaultFingerprint = {
      userAgent: userAgent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
      screen: screen || { width: 1920, height: 1080 },
      timezone: timezone || "America/New_York",
      language: "en-US"
    };

    const newProfile = {
      id: 'ghost-' + Math.random().toString(36).substring(2, 8),
      name,
      proxy,
      group,
      fingerprint: defaultFingerprint
    };

    profiles.push(newProfile);
    if (group && !groups.includes(group)) groups.push(group);

    fs.writeFileSync(profilePath, JSON.stringify(profiles, null, 2));
    fs.writeFileSync(groupPath, JSON.stringify(groups, null, 2));

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to save profile/group:', err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
