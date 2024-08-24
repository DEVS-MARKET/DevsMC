import {app, BrowserWindow, net, dialog, Notification, protocol} from 'electron';
import * as path from "node:path";
import {checkJavaInstallation, installJava} from './functions/javaFunctions';
import Store from "./storage.js";
import crypto from "crypto";
import fs from "fs";
import ipcEvents from "./functions/ipcEvents";
import * as url from "node:url";
import seedDefaultSettings from "./seedDefaultSettings";
import {updateElectronApp, UpdateSourceType} from "update-electron-app";

if (!fs.existsSync(path.join(app.getPath('userData'), '.securityToken'))) {
    const securityToken = crypto.randomBytes(64).toString('hex');
    fs.writeFileSync(path.join(app.getPath('userData'), '.securityToken'), securityToken);
}

updateElectronApp({
    updateSource: {
        type: UpdateSourceType.ElectronPublicUpdateService,
        repo: "DEVS-MARKET/DevsMC",
    },
    updateInterval: "1 hour",
    notifyUser: true,
});


const accountStorage = new Store(fs.readFileSync(path.join(app.getPath('userData'), '.securityToken'), 'utf8'), 'accounts.json');
const settingsStorage = new Store(fs.readFileSync(path.join(app.getPath('userData'), '.securityToken'), 'utf8'), 'settings.json');

let win;
if (require('electron-squirrel-startup')) {
  app.quit();
}

seedDefaultSettings(settingsStorage, app);

app.setAsDefaultProtocolClient('devsmc');
protocol.registerSchemesAsPrivileged([
    { scheme: 'devsmc', privileges: { standard: true, secure: true, bypassCSP: true } }
]);
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    autoHideMenuBar: true,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),

    },
      icon: path.join(__dirname, '/assets/icon.png'),
  });

  mainWindow.setTitle("DevsMC Launcher");

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }


  win = mainWindow;
  ipcEvents(accountStorage, settingsStorage, win)
  app.setAppUserModelId(MAIN_WINDOW_VITE_DEV_SERVER_URL ? process.execPath : "DevsMC Launcher");
};


app.whenReady().then((scheme, handler) => {
    createWindow();

    protocol.handle('devsmc', async (request) => {
        const filePath = request.url.slice('devsmc://'.length)
        return net.fetch(url.pathToFileURL(path.join(__dirname, filePath)).toString())
    });

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
                body: "Java is not installed on your system, we will install it for you. - " + error.message,
            }).show();

            installJava(app, win, settingsStorage)
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