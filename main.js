
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'icon.png')
  });

  // Load root instead of /login
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:4000/');
  }, 1500);
}

// Launch backend server
function launchServer() {
  const server = spawn('node', ['server/app.js'], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit'
  });
  console.log('🔧 Backend server starting...');
}

app.whenReady().then(() => {
  launchServer();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
