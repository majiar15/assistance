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
      resizable: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
  
    secondaryWindow.loadFile(path.join(__dirname, './qr.html'));
  
    secondaryWindow.on('closed', () => {
      secondaryWindow = null;
    });
  }

  app.whenReady().then(() => {
    createWindow();

    // Si quieres abrir la ventana secundaria desde el inicio, llama a createSecondaryWindow aquí
    // createSecondaryWindow();

    ipcMain.on('open-window', (event, windowType) => {
        if (windowType === 'secondary') {
            createSecondaryWindow();
        }
    });
});


app.on('open-window', (event, { url }) => {
    if (!secondaryWindow) {
        createSecondaryWindow(url);
    } else {
      qrWindow.setBounds({ width, height });
      qrWindow.webContents.send('update-qr-image', url);
    }
  });


app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});







