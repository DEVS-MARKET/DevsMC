import {app, ipcMain, Notification} from "electron";
import {Auth} from "msmc";
import { Client, Authenticator } from "minecraft-launcher-core";
import * as path from "node:path";
import fs from "node:fs";
import * as os from "node:os";

const launcher = new Client();

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
        let options = {
            authorization: data.user.microsoft ? data.user.object : Authenticator.getAuth(data.user.object.username),
            root: path.join(app.getPath("userData"), ".minecraft"),
            version: data.launcher.version,
            memory: data.launcher.memory,
            javaPath: path.join(findJdkFolder(path.join(app.getPath('userData'), 'java')), 'bin', 'java')
        }

        launcher.launch(options);

        launcher.on('debug', (e) => {
          win.webContents.send('log', e);
        })

        launcher.on('data', (e) => {
          win.webContents.send('log', e);
        })

        launcher.on('download-status', ({ name, current, total}) => {
            win.webContents.send('log', `Downloading ${name}: ${current} bytes/${total} bytes`);
        });
    })


    ipcMain.handle("setSettingValue", async (event, key, value) => {
        settingsStorage.set(key, value);
    });

    ipcMain.handle("getSettingValue", async (event, key) => {
        return settingsStorage.get(key);
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

        let customVersions = fs.readdirSync(path.join(app.getPath("userData"), ".minecraft", "versions"))
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
            });

        return {
            officialVersions: officialMojangVersions,
            customVersions: customVersions
        };
    });
}