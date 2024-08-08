const { ipcRenderer } = require('electron');
const QRCode = require('qrcode');

ipcRenderer.on('update-qr-image', (event, url) => {
    QRCode.toDataURL(url, { errorCorrectionLevel: 'H', margin: 1 }, function (err, url) {
        if (err) {
          console.error('Error al generar el QR Code:', err);
          return;
        }
        document.getElementById('qrCodeImage').src = url;
        
      });
    
});


