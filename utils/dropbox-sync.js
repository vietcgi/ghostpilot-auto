
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const DROPBOX_TOKEN = process.env.DROPBOX_TOKEN; // Set this in your environment
const dropboxApiUrl = 'https://content.dropboxapi.com/2/files/upload';
const localPath = path.join(__dirname, '../profiles/store.json');

async function uploadProfileStore() {
  if (!DROPBOX_TOKEN) throw new Error('DROPBOX_TOKEN not set');

  const fileContent = fs.readFileSync(localPath);
  const res = await fetch(dropboxApiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${DROPBOX_TOKEN}`,
      'Dropbox-API-Arg': JSON.stringify({
        path: '/ghostpilot/store.json',
        mode: 'overwrite',
        autorename: false,
        mute: false
      }),
      'Content-Type': 'application/octet-stream'
    },
    body: fileContent
  });

  const data = await res.json();
  if (res.ok) {
    console.log('✅ Profile store uploaded to Dropbox:', data.path_display);
  } else {
    console.error('❌ Dropbox upload failed:', data);
  }
}

module.exports = { uploadProfileStore };
