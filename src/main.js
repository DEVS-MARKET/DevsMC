import fs from "node:fs";

const { app, BrowserWindow, dialog } = require('electron');
const path = require('node:path');
import {checkJavaInstallation, installJava} from './functions/javaFunctions';
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

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();

  win = mainWindow;
};

app.whenReady().then(() => {
    createWindow();

    checkJavaInstallation(app)
        .then((result) => {
        })
        .catch((error) => {
            dialog.showMessageBox({
                type: "info",
                title: "Java not found, installing Java",
                message: "Downloading and installing Java, this may take a while",
            })

            installJava(app, win)
                .then((result) => {
                    dialog.showMessageBox({
                        type: "info",
                        title: "Java installed",
                        message: "Java has been installed successfully",
                    })
                })
                .catch((error) => {
                    dialog.showMessageBox({
                        type: "error",
                        title: "Error",
                        message: error.message,
                    })
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