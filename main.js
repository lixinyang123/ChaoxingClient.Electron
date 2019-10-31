const { app, BrowserWindow, Menu, shell } = require('electron');
const fs = require("fs");
var menuTemplate = require("./menuTemplate");
var scriptManager = require("./scriptManager");

let win,script;

function initMenu(){
    var template = menuTemplate.getmenuTemplate(win.webContents,shell);
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

function createWindow() {
    win = new BrowserWindow({
        width: 961,
        height: 675,
        webPreferences: {
            nodeIntegration: false
        }
    });
    initMenu();

    win.loadURL('http://passport2.chaoxing.com/login');

    //win.webContents.openDevTools();

    win.webContents.on('new-window',(event, url, frameName, disposition, options)=>{
        win.loadURL(url);
        event.preventDefault();
    });

    win.webContents.on('dom-ready',()=>{
        win.webContents.executeJavaScript(script);
    });

    win.on('closed', () => {
        win = null
    });
}

app.on('ready', ()=>{
    //初始化脚本
    scriptManager.getScript((pscript)=>{
        script = pscript;
    });
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});