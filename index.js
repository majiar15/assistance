const { app, ipcMain, BrowserWindow, screen } = require("electron");
const path = require("path");

let secondaryWindow;
let appWin;

createWindow = () => {
  appWin = new BrowserWindow({
    width: 700,
    height: 600,
    title: "Unilibre",
    icon: path.join(`${__dirname}./src/assets/favicon.ico`),
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      
      preload: path.join(__dirname, 'preload.js')
    }

  });

  appWin.loadFile(`${__dirname}/dist/index.html`);

  appWin.setMenu(null);

  //appWin.webContents.openDevTools();

  appWin.on("closed", () => {
    appWin = null;
    app.quit();
  });
}

function createSecondaryWindow(qrCodeUrl) {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const x = width - 160;
  const y = height - 190;

  secondaryWindow = new BrowserWindow({
    width: 150,
    height: 180,
    x: x,
    y: y,
    resizable:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    alwaysOnTop: true,
  });

  secondaryWindow.setMenu(null);

  secondaryWindow.loadFile(path.join(__dirname, './desktop/QR/qr.html'));

  secondaryWindow.on('closed', () => {
    secondaryWindow = null;
  });

  secondaryWindow.webContents.on('did-finish-load', () => {
    secondaryWindow.webContents.send('update-qr-image', qrCodeUrl);
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
  ipcMain.on('open-qr-window', (event,{secret}) => {
    
    if (!secondaryWindow) {
      createSecondaryWindow(secret);
    } else {
      secondaryWindow.webContents.send('update-qr-image', secret);
    }
  });
  ipcMain.on('update-qr', (event, { secret }) => {
    if (secondaryWindow) {
      secondaryWindow.webContents.send('update-qr-image', secret);
    }
  })

  ipcMain.on('closed-qr', (event,) => {
    if (secondaryWindow) {
      secondaryWindow.close();
      secondaryWindow = null;
    }
  })


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







