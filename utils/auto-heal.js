
const fs = require('fs');
const path = require('path');

const logsPath = path.join(__dirname, '../logs/selector-errors.json');
const healingLog = path.join(__dirname, '../logs/auto-heal-suggestions.json');

function analyzeSelectorFailures() {
  if (!fs.existsSync(logsPath)) return [];

  const errors = JSON.parse(fs.readFileSync(logsPath));
  const suggestions = errors.map(entry => {
    const { failedSelector, url } = entry;

    const cleanedSelector = failedSelector.replace(/:[a-z]+\(.*?\)/g, '').trim();
    const altSuggestion = failedSelector.includes('button')
      ? cleanedSelector.replace('button', 'input[type=submit]')
      : cleanedSelector + ', a';

    return {
      failedSelector,
      url,
      suggestion: altSuggestion,
      strategy: 'Try broader selector or fallback element type'
    };
  });

  fs.writeFileSync(healingLog, JSON.stringify(suggestions, null, 2));
  console.log(`🧠 Auto-Heal: ${suggestions.length} selector fixes suggested.`);

  return suggestions;
}

module.exports = { analyzeSelectorFailures };
