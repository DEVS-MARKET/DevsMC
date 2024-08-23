import {app, ipcMain, Notification, shell} from "electron";
import {Auth} from "msmc";
import {Authenticator, Client} from "minecraft-launcher-core";
import * as path from "node:path";
import fs from "node:fs";
import * as os from "node:os";

let launcher = null;
let launchedClient = null;
let logFile = null;

function findJdkFolder(folderPath) {
    const files = fs.readdirSync(folderPath);

    const jdkFolder = files.find(file => {
        const filePath = path.join(folderPath, file);
        return fs.statSync(filePath).isDirectory() && file.startsWith('zulu');
    });

    return jdkFolder ? path.join(folderPath, jdkFolder) : null;
}

export default (accountStorage, settingsStorage, win) => {
    ipcMain.handle("login", async (event) => {
        const authManager = new Auth("select_account");
        const xboxManager = await authManager.launch("electron")
        const token = await xboxManager.getMinecraft();

        accountStorage.pushToArray("minecraftAccounts", {
            microsoft: true,
            object: token.mclc(true)
        });
    });

    ipcMain.handle("login-nopremium", async (event, username) => {
        accountStorage.pushToArray("minecraftAccounts", {
            microsoft: false,
            object: {
                username: username
            }
        });
    })

    ipcMain.handle("getMinecraftAccounts", async (event) => {
        return accountStorage.get("minecraftAccounts");
    });

    ipcMain.handle("removeAccount", async (event, index) => {
        let temp = storage.get("minecraftAccounts")[index];
        new Notification({
            title: "Account removed",
            body: `Account ${temp.object.username || temp.object.name} has been removed.`,
        }).show();
        accountStorage.removeFromArrayByIndex("minecraftAccounts", index);
    });

    ipcMain.handle("sendNotification", async (event, title, body) => {
        new Notification({
            title: title,
            body: body,
        }).show();
    });

    ipcMain.handle("changeTitle", async (event, title) => {
        win.setTitle(title + " - DevsMC Launcher");
    });

    ipcMain.handle("getPlatform", async (event) => {
        return {
            platform: process.platform,
            totalmem: os.totalmem() / 1024 / 1024 / 1024,
        }
    });


    ipcMain.handle("runGame", async (event, data) => {
        if (data.user.microsoft) {
            const authManager = new Auth("none");
            const xboxManager = await authManager.refresh(data.user.object.meta.refresh);
            const token = await xboxManager.getMinecraft();

            // Find the account in the array and update it
            let accounts = accountStorage.get("minecraftAccounts");
            let index = accounts.findIndex(account => account.object.username === data.user.object.username);
            accounts[index].object = token.mclc(true);
            accountStorage.set("minecraftAccounts", accounts);
            data.user.object = token.mclc(true);
        }

        launcher = new Client();

        let options = {
            authorization: data.user.microsoft ? data.user.object : Authenticator.getAuth(data.user.object.username),
            root: settingsStorage.get("path") || path.join(app.getPath("userData"), ".minecraft"),
            version: data.launcher.version,
            customArgs: data.launcher.customArgs,
            memory: data.launcher.memory,
            javaPath: settingsStorage.get("java") || path.join(findJdkFolder(path.join(app.getPath('userData'), 'java')), 'bin', 'java')
        }

        launchedClient = launcher.launch(options);

        launcher.on('debug', (e) => {
            win.webContents.send('log', {type: 'log', log: e});
        })

        launcher.on('data', (e) => {
          win.webContents.send('log', {type: 'log', log: e});
        })

        launcher.on('close', (e) => {
            win.webContents.send('closedGame');
        });
    });

    ipcMain.handle("stopGame", async (event) => {
        if (launchedClient !== null) {
            launchedClient.kill();
        }
    });


    ipcMain.handle("setSettingValue", async (event, key, value) => {
        settingsStorage.set(key, value);
    });

    ipcMain.handle("getSettingValue", async (event, key) => {
        return settingsStorage.get(key);
    });

    ipcMain.handle("getSettings", async (event) => {
        return settingsStorage.getAll();
    });

    ipcMain.handle("getMinecarftVersions", async (event) => {
        let request = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");

        let json = await request.json();
        let officialMojangVersions = json.versions.map(version => {
            return {
                number: version.id,
                type: version.type,
                name: `${version.id} - ${version.type}`
            }
        });


        let customVersions = fs.existsSync(path.join(app.getPath("userData"), ".minecraft", "versions")) ? fs.readdirSync(path.join(app.getPath("userData"), ".minecraft", "versions"))
            .filter(directory => officialMojangVersions.find(version => version.number === directory) === undefined)
            .map(directory => {
                let json = JSON.parse(fs.readFileSync(path.join(app.getPath("userData"), ".minecraft", "versions", directory, `${directory}.json`), 'utf8'));
                let number = json.assetIndex?.id || json.inheritsFrom;
                return {
                    number: number,
                    type: "custom",
                    custom: directory,
                    name: `${directory} (${number}) - custom`
                }
            }) : [];

        return [...officialMojangVersions, ...customVersions];
    });

    ipcMain.handle("getLogsFiles", async (event) => {
        return fs.readdirSync(path.join(app.getPath("userData"), ".minecraft", "logs"))
            .filter(file => file.endsWith(".json"))
            .map(file => {
                return {
                    name: file,
                }
            });
    });

    ipcMain.handle("getLogContent", async (event, name) => {
        return JSON.parse(fs.readFileSync(path.join(app.getPath("userData"), ".minecraft", "logs", name), 'utf8'));
    });

    ipcMain.handle("openDirectory", async (event, path) => {
        await shell.openPath(path);
    });

    ipcMain.handle("getEnv", async (event) => {
        return {
            strapi_key: "ca416e78d7a6dd2851889d06cdb9c49a8a2dbc7910890649306ff9f592c32036eb6661a746f5d995d2ceca7791ad8724e7921814b31248b6d24affadee5a3aca079852bfd607163f705f9191f4f9e9208f2cf6eff4645c6aad68304c6aed6133367cb157047cf1817df86044fc580dd9b9f6bc5885df3485306769f99a6d98ba",
            strapi_url: "https://strapi.khaller.com/api/news?sort[0]=id:desc",
        };
    });
}