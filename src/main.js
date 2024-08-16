import { app, BrowserWindow, dialog, Notification  } from 'electron';
import * as path from "node:path";
import {checkJavaInstallation, installJava} from './functions/javaFunctions';
import {ipcMain} from "electron";
import {Auth} from "msmc";
import Store from "./storage.js";
import crypto from "crypto";
import fs from "fs";

if (!fs.existsSync(path.join(app.getPath('userData'), '.securityToken'))) {
    const securityToken = crypto.randomBytes(64).toString('hex');
    fs.writeFileSync(path.join(app.getPath('userData'), '.securityToken'), securityToken);
}
const storage = new Store(fs.readFileSync(path.join(app.getPath('userData'), '.securityToken'), 'utf8'));

let win;
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: true,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();

  win = mainWindow;
  app.setAppUserModelId(process.execPath)
};

app.whenReady().then(() => {
    createWindow();

    checkJavaInstallation(app)
        .then((result) => {
            new Notification({
                title: "Java installed",
                body: "Java is installed on your system.",
            }).show();
        })
        .catch((error) => {
            new Notification({
                title: "Java not installed",
                body: "Java is not installed on your system, we will install it for you.",
            }).show();

            installJava(app, win)
                .then((result) => {
                    new Notification({
                        title: "Java installed",
                        body: "Java has been installed on your system.",
                    }).show();
                })
                .catch((error) => {
                    new Notification({
                        title: "Java installation failed",
                        body: "Java installation failed.",
                    }).show();

                    dialog.showErrorBox("Java installation failed", error.message);
                });
        });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle("login", async (event) => {
    const authManager = new Auth("select_account");
    const xboxManager = await authManager.launch("electron")
    const token = await xboxManager.getMinecraft();
    
});

ipcMain.handle("getMinecraftAccounts", async (event) => {

});