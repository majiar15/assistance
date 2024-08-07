const { ipcRenderer } = require('electron');

ipcRenderer.on('update-qr-image', (event, url) => {
    document.getElementById('qrCodeImage').src = url;
});