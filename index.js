const { app, BrowserWindow } = require("electron");

let secondaryWindow;
let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 700,
        height: 600,
        title: "Angular and Electron",
        resizable: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    
    appWin.loadURL(`${__dirname}/dist/index.html`);

    //appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

function createSecondaryWindow() {
    secondaryWindow = new BrowserWindow({
      width: 400,
      height: 300,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false
      }
    });
  
    secondaryWindow.loadFile(path.join(__dirname, './qr.html'));
  
    secondaryWindow.on('closed', () => {
      secondaryWindow = null;
    });
  }

app.on("ready", ()=>{
    if (appWin !== null) createMainWindow();
    //if (secondaryWindow === null) createSecondaryWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

app.on('open-window', (event, windowType) => {
    // if (windowType === 'secondary') {
    //   createSecondaryWindow();
    // }
  });





