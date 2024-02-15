// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minimizeWindow: () => ipcRenderer.send('control-minimize'),
  fullscreenWindow: () => ipcRenderer.send('control-fullscreen'),
  closeWindow: () => ipcRenderer.send('control-close'),
  receive: (channel, func) => {
    let validChannels = ["fromSystem"];
    if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender` 
        ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
    }
  },

  openWebview: (url) => {
    console.log(url)
    ipcRenderer.send('open-webview', url);
  },

  sendResizeWebview: (sizes) => {
    ipcRenderer.send('resize-webview', sizes);
  },
  detachCurrentApp: () => {
    ipcRenderer.send('detach-app');
  },
  closeCurrentApp: () => {
    ipcRenderer.send('close-app');
  },
  refreshCurrentApp: () => {
    ipcRenderer.send('refresh-app');
  },
  openApp: (workspace, app) => {
    ipcRenderer.send('open-app', workspace, app)
  },
  closeAllApp: () => {
    ipcRenderer.send('closeall-app')
  },

  sendConfig: (config) => {
    ipcRenderer.send('config', config)
  }
})

/*window.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('clickThroughElement')
  el.addEventListener('mouseenter', () => {
    ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
  })
  el.addEventListener('mouseleave', () => {
    ipcRenderer.send('set-ignore-mouse-events', false)
  })
})*/