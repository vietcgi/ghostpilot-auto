
const fs = require('fs');
const path = require('path');

const pluginDir = path.join(__dirname, '../plugins');

function loadPlugins() {
  const plugins = [];
  if (!fs.existsSync(pluginDir)) fs.mkdirSync(pluginDir);

  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'));

  for (const file of files) {
    try {
      const plugin = require(path.join(pluginDir, file));
      plugins.push({ name: file, plugin });
      console.log(`✅ Loaded plugin: ${file}`);
    } catch (e) {
      console.warn(`⚠️ Failed to load plugin ${file}:`, e.message);
    }
  }

  return plugins;
}

module.exports = { loadPlugins };
