const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    width: 1280,
    minWidth: 1280,
    minHeight: 720,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  // Remove the menu bar
  mainWindow.setMenu(null);

  // Load the index.html file.
  mainWindow.loadFile('index.html')

  // Open DevTools.
  // mainWindow.webContents.openDevTools()
}
// When Electron has finished initializing, create a new window.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
