
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function exportGhostBundle(outputPath) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outputPath);

  archive
    .directory(path.join(__dirname, '../profiles'), 'profiles')
    .directory(path.join(__dirname, '../automation/scripts'), 'scripts')
    .file(path.join(__dirname, '../automation/scripts.json'), { name: 'scripts.json' })
    .file(path.join(__dirname, '../profiles/store.json'), { name: 'store.json' })
    .file(path.join(__dirname, '../profiles/fingerprint-pool.json'), { name: 'fingerprint-pool.json' });

  archive.pipe(stream);
  archive.finalize();

  stream.on('close', () => {
    console.log(`📦 Exported .ghostbundle to ${outputPath} (${archive.pointer()} bytes)`);
  });
}

const outFile = path.join(__dirname, '../ghostpilot-export.ghostbundle');
exportGhostBundle(outFile);
