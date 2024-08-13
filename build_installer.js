const electronInstaller = require('electron-winstaller');

(async function() {
try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: `${__dirname}/release-builds/Unilibre-win32-x64`,
      outputDirectory: `${__dirname}/installer`,
      authors: 'Univeridad Libre',
      exe: 'unilibre.exe',
      description: 'App de asistencia unilibre',
      version:'1.0.0',
      setupIcon: `${__dirname}/src/assets/favicon.ico`,
      setupExe:"Unilibre.exe",
      setupMsi:'Unilibre.msi',
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }

})();



// const { MSICreator } = require('electron-wix-msi');
// const path = require('path');

// // Define el directorio de salida para tu instalador
// const outDir = path.resolve(__dirname, './installer');

// // Define la configuración del MSI
// const msiCreator = new MSICreator({
//   appDirectory: path.resolve(`${__dirname}/release-builds/Unilibre-win32-x64`), // Carpeta con tu aplicación empaquetada
//   outputDirectory: outDir,

//   // Detalles de tu aplicación
//   description: 'Descripción de tu aplicación',
//   exe: 'Unilibre',
//   name: 'Asistencia Unilibre',
//   manufacturer: 'Unilibre',
//   version: '1.0.0',

//   // Configuración de la interfaz del instalador
//   ui: {
//     chooseDirectory: true
//   },
//   icon: path.resolve(`${__dirname}/src/assets/favicon.ico`),
//   // Configuración de acceso directo
//   shortcutFolderName: 'Asistencia Unilibre',
//   shortcutName: 'Unilibre',

//   // Detalles del programa en el menú de inicio
//   programFilesFolderName: 'Asistencia Unilibre',
// });

// // Crea el archivo .wxs
// msiCreator.create().then(function () {
//   // Compila el instalador MSI
//   msiCreator.compile();
// });