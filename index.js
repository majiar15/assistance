const { app, ipcMain, BrowserWindow, screen } = require("electron");
const path = require("path");

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
            nodeIntegration: true,

            preload: path.join(__dirname, 'preload.js')
        }

    });
    
    appWin.loadFile(`${__dirname}/dist/index.html`);

    //appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

function createSecondaryWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const x = width - 140;
    const y = height - 175;

    secondaryWindow = new BrowserWindow({
      width: 140,
      height: 175,
      x: x,
      y: y,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'preload.js')
      },
      alwaysOnTop: true,
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
    ipcMain.on('open-qr-window', (event) => {
        createSecondaryWindow();
        // if (!qrWindow) {
        // } else {
        //   qrWindow.setBounds({ width, height });
        //   qrWindow.webContents.send('update-qr-image', url);
        // }
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







