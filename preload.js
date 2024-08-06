const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        console.log("dependency", dependency);
        console.log("process.versions[dependency]", process.versions[dependency]);
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

