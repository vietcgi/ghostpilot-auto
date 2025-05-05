
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Replace with your real bot token
const bot = new TelegramBot(TOKEN, { polling: true });

const scriptsPath = path.join(__dirname, '../automation/scripts.json');

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '👋 Welcome to GhostPilot Bot!\nUse /scripts to list scripts or /run [name] to execute one.');
});

bot.onText(/\/scripts/, (msg) => {
  const scripts = JSON.parse(fs.readFileSync(scriptsPath));
  const names = scripts.map(s => `• ${s.name}`).join('\n');
  bot.sendMessage(msg.chat.id, '📜 Available Scripts:\n' + names);
});

bot.onText(/\/run (.+)/, (msg, match) => {
  const scriptName = match[1];
  const scripts = JSON.parse(fs.readFileSync(scriptsPath));
  const found = scripts.find(s => s.name.toLowerCase() === scriptName.toLowerCase());

  if (found) {
    const logPath = path.join(__dirname, '../logs/execution-log.json');
    const logs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath)) : [];
    logs.push({
      scriptName: found.name,
      profile: 'telegram',
      timestamp: new Date().toISOString(),
      steps: [],
      status: 'queued'
    });
    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
    bot.sendMessage(msg.chat.id, `✅ Queued '${found.name}' for execution.`);
  } else {
    bot.sendMessage(msg.chat.id, `❌ Script '${scriptName}' not found.`);
  }
});
