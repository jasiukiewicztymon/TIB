const { app, BrowserWindow, ipcMain, dialog, session, BrowserView } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

/*
app.commandLine.appendSwitch('auth-server-whitelist', "*");
app.commandLine.appendSwitch('enable-ntlm-v2', 'true');
app.commandLine.appendSwitch('try-supported-channel-layouts');

const disabledFeatures = app.commandLine.hasSwitch('disable-features') ? app.commandLine.getSwitchValue('disable-features').split(',') : ['HardwareMediaKeyHandling'];
if (!disabledFeatures.includes('HardwareMediaKeyHandling')) disabledFeatures.push('HardwareMediaKeyHandling');
app.commandLine.appendSwitch('disable-features', disabledFeatures.join(','));*/

const createWindow = () => {
  (async () => {
    await session.defaultSession.clearStorageData();
  })()

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      allowpopups: true,
      sandbox: false,
      plugins: true,
      contextIsolation: true
    },
    frame: false
  });

  // WindowConrol... functions
  // Minimize
  const windowControlMinimize = () => {
    mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize()
  }
  // Fullscreen
  const windowControlFullscreen = () => {
    mainWindow.isFullScreen() ? mainWindow.setFullScreen(false) : mainWindow.setFullScreen(true)
  }
  // Close
  const windowControlClose = () => {
    let res = dialog.showMessageBoxSync(mainWindow, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to quit?'
    });
    if (res != 1) mainWindow.close();
  }

  ipcMain.on('control-minimize', windowControlMinimize)
  ipcMain.on('control-fullscreen', windowControlFullscreen)
  ipcMain.on('control-close', windowControlClose)

  // and load the index.html of the app.
  //mainWindow.loadFile("src/index.html");
  mainWindow.loadURL("http://localhost:3000", {
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
  })

  // F11 fullscreen management
  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.send('fromSystem', true)
    // console.log('enter')
  })
  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.send('fromSystem', false)
    // console.log('leave')
  })

  // Open the DevTools.
   mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
