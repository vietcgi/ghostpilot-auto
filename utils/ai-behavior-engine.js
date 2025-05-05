
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs/session-replays');
const tuneLog = path.join(__dirname, '../logs/ai-adjustments.json');

function analyzeReplays() {
  const files = fs.readdirSync(logDir).filter(f => f.endsWith('.html'));
  const results = [];

  files.forEach(file => {
    const html = fs.readFileSync(path.join(logDir, file), 'utf8');
    const insights = {
      file,
      waitSuggestion: html.includes('slow network') ? 'increase wait time' : 'OK',
      interactionSuggestion: html.includes('access denied') ? 'add hover, pause before click' : 'OK',
      stealthHint: html.includes('unusual activity') ? 'rotate fingerprint next time' : 'OK'
    };
    results.push(insights);
  });

  fs.writeFileSync(tuneLog, JSON.stringify(results, null, 2));
  console.log(`🧠 AI Behavior Tuner analyzed ${results.length} replays`);
  return results;
}

module.exports = { analyzeReplays };
