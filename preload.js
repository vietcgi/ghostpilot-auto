
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  launchProfile: (profileId) => ipcRenderer.send('launch-profile', profileId)
});
