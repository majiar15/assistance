const { app, ipcMain, BrowserWindow, screen } = require("electron");
const path = require("path");
if (require('electron-squirrel-startup')) return;


if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      const iconPath = path.join(`${__dirname}/src/assets/favicon.ico`);
      // Optionally do things such as:
      
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName,`--icon=${iconPath}`]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};

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
  const y = height - 205;

  secondaryWindow = new BrowserWindow({
    width: 180,
    height: 200,
    x: 5,
    y: y,
    resizable:true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    alwaysOnTop: true,
    //maximizable:false,
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







