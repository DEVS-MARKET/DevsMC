import { app, BrowserWindow, dialog, Notification, Menu  } from 'electron';
import * as path from "node:path";
import {checkJavaInstallation, installJava} from './functions/javaFunctions';
import Store from "./storage.js";
import crypto from "crypto";
import fs from "fs";
import ipcEvents from "./functions/ipcEvents";

if (!fs.existsSync(path.join(app.getPath('userData'), '.securityToken'))) {
    const securityToken = crypto.randomBytes(64).toString('hex');
    fs.writeFileSync(path.join(app.getPath('userData'), '.securityToken'), securityToken);
}

const accountStorage = new Store(fs.readFileSync(path.join(app.getPath('userData'), '.securityToken'), 'utf8'), 'accounts.json');
const settingsStorage = new Store(fs.readFileSync(path.join(app.getPath('userData'), '.securityToken'), 'utf8'), 'settings.json');

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
    },
  });
  mainWindow.setTitle("DevsMC Launcher");

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();

  win = mainWindow;
  ipcEvents(accountStorage, settingsStorage, win)
  app.setAppUserModelId(process.execPath);
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