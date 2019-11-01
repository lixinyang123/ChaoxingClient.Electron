const { app, BrowserWindow, Menu, shell } = require('electron');
var menuTemplate = require("./menuTemplate");
var scriptManager = require("./scriptManager");

let win,script;

function createWindow() {
    win = new BrowserWindow({
        width: 961,
        height: 675,
        webPreferences: {
            nodeIntegration: false
        }
    });

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

//初始化程序
function initApp(){
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
}

//初始化顶部菜单
//初始化菜单需要BrowserWindow对象，需要在initApp之后
function initMenu(){
    var template = menuTemplate.getmenuTemplate(win.webContents,shell);
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

//切换静音
function muted(){
    if(script.indexOf("muted: false")>0){
        script = script.replace("muted: false","muted: true");
    }
    else{
        script = script.replace("muted: true","muted: false");
    }
}

//切换自动答题
function autoAnswer(){
    if(script.indexOf("auto_answer: true")){
        script = script.replace("auto_answer: true","auto_answer: false");
    }
    else{
        script = script.replace("auto_answer: false","auto_answer: true");
    }
}

initApp();
initMenu();

module.exports = { muted, autoAnswer }