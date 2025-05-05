
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const userPath = path.join(__dirname, '../profiles/users.json');

// Get all users
router.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(userPath, 'utf8'));
  res.json(users);
});

// Add or update a user
router.post('/users', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ error: 'Missing user info' });

  const users = JSON.parse(fs.readFileSync(userPath, 'utf8'));
  users[username] = { username, password, role };
  fs.writeFileSync(userPath, JSON.stringify(users, null, 2));
  res.json({ success: true, user: users[username] });
});

// Delete a user
router.delete('/users/:username', (req, res) => {
  const users = JSON.parse(fs.readFileSync(userPath, 'utf8'));
  const username = req.params.username;

  if (!users[username]) return res.status(404).json({ error: 'User not found' });

  delete users[username];
  fs.writeFileSync(userPath, JSON.stringify(users, null, 2));
  res.json({ success: true });
});

module.exports = router;
