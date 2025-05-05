
const { GhostCursor, installMouseHelper } = require('ghost-cursor');

function attachCursor(page) {
  installMouseHelper(page);
  return GhostCursor.fromPage(page);
}

module.exports = { attachCursor };
