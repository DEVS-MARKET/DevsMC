import {app, ipcMain, Notification, shell} from "electron";
import {Auth} from "msmc";
import {Authenticator, Client} from "minecraft-launcher-core";
import {forge, fabric} from "tomate-loaders";
import * as path from "node:path";
import fs from "node:fs";
import DiscordRCP from "discord-rpc";
import * as os from "node:os";
import discordRpc from "./discordRpc";
import modpacks from "./ipc/events/modpacks";
let launcher = new Client();
let launchedClient = null;
const startTimestamp = new Date();
let text = "Playing Minecraft";
DiscordRCP.register('1276294581058666497');
let RPC = new DiscordRCP.Client({
    transport: 'ipc',
})


RPC.on('ready', () => {
    setInterval(() => {
        discordRpc(RPC, text, startTimestamp);
    }, 15e3);
});

RPC.login({clientId: '1276294581058666497'}).catch(console.error);

function findJdkFolder(folderPath) {
    const files = fs.readdirSync(folderPath);

    const jdkFolder = files.find(file => {
        const filePath = path.join(folderPath, file);
        return fs.statSync(filePath).isDirectory() && file.startsWith('jdk-') || fs.statSync(filePath).isDirectory() && file.startsWith('jdk');
    });

    return jdkFolder ? path.join(folderPath, jdkFolder) : null;
}

export default (accountStorage, settingsStorage, win, modpacksStorage) => {
    launcher.on('debug', (e) => {
        win.webContents.send('runningGame');
        win.webContents.send('log', {type: 'log', log: e});
    })

    launcher.on('data', (e) => {
        win.webContents.send('runningGame');
        win.webContents.send('log', {type: 'log', log: e});
    })

    launcher.on('close', (e) => {
        win.webContents.send('closedGame');
    });

    launcher.on('download-status', (e) => {
        win.webContents.send('downloading', {
            percent: e.total === 0 ? 0 : Math.round(e.current / e.total * 100)
        })
    });

    ipcMain.handle("login", async (event) => {
        const authManager = new Auth("select_account");
        const xboxManager = await authManager.launch("electron")
        const token = await xboxManager.getMinecraft();
        let obj = token.mclc(true);
        accountStorage.pushToArray("minecraftAccounts", {
            microsoft: true,
            object: obj
        });

        new Notification({
            title: "Account added",
            body: `Account ${obj.name} has been added.`,
        }).show();

        let accounts = accountStorage.get("minecraftAccounts");
        let index = accounts.findIndex(account => account.object.name === obj.name);


        return {
            index: index,
            account: accounts[index]
        };
    });

    ipcMain.handle("login-nopremium", async (event, username) => {
        accountStorage.pushToArray("minecraftAccounts", {
            microsoft: false,
            object: {
                username: username
            }
        });

        new Notification({
            title: "Account added",
            body: `Account ${username} has been added.`,
        }).show();

        let accounts = accountStorage.get("minecraftAccounts");
        let index = accounts.findIndex(account => account.object.username === username);
        return {
            index: index,
            account: accounts[index]
        };
    })

    ipcMain.handle("getMinecraftAccounts", async (event) => {
        return accountStorage.get("minecraftAccounts");
    });

    ipcMain.handle("removeAccount", async (event, index) => {
        let temp = accountStorage.get("minecraftAccounts")[index];
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
        text = title;
    });

    ipcMain.handle("getPlatform", async (event) => {
        return {
            platform: process.platform,
            totalmem: os.totalmem() / 1024 / 1024 / 1024,
        }
    });


    ipcMain.handle("runGame", async (event, data) => {
        text = `Playing Minecraft as ${data.user.object.username || data.user.object.name} (Minecraft version: ${data.launcher.version.number})`;
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

        let javaPath = compareVersions(data.launcher.version.number, "1.13") >= 0 ? settingsStorage.get("java") || path.join(findJdkFolder(path.join(app.getPath('userData'), 'java')), 'bin', 'java') : settingsStorage.get("java8") || path.join(findJdkFolder(path.join(app.getPath('userData'), 'java8')), 'bin', 'java');

        let options = {
            authorization: data.user.microsoft ? data.user.object : Authenticator.getAuth(data.user.object.username),
            root: settingsStorage.get("path") || path.join(app.getPath("userData"), ".minecraft"),
            version: data.launcher.version,
            customArgs: data.launcher.customArgs,
            memory: data.launcher.memory,
            javaPath: javaPath
        }

        launcher.launch(options)
            .then((launch) => {
                launchedClient = launch;
            });
    });

    ipcMain.handle("stopGame", async (event) => {
        if (launchedClient) {
            launchedClient.kill()
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
            .filter(directory => {
                if (!fs.existsSync(path.join(app.getPath("userData"), ".minecraft", "versions", directory, `${directory}.json`))) {
                    return false;
                }

                let json = JSON.parse(fs.readFileSync(path.join(app.getPath("userData"), ".minecraft", "versions", directory, `${directory}.json`), 'utf8'));
                return json.assetIndex?.id !== undefined || json.inheritsFrom !== undefined;
            })
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
            strapi_key: process.env.STRAPI_TOKEN,
            strapi_url: process.env.STRAPI_URL,
            ga4_id: process.env.GA4_GA_ID,
            ga4_secret: process.env.GA4_SECRET,
        };
    });

    ipcMain.handle("getInstallationStatus", async (event) => {
        let installationStatus = fs.existsSync(path.join(app.getPath('userData'), '.installerLock'));
        if (!fs.existsSync(path.join(app.getPath('userData'), '.installerLock'))) {
            fs.writeFileSync(path.join(app.getPath('userData'), '.installerLock'), "locked")
            return installationStatus;
        }

        return installationStatus;
    })

    ipcMain.handle("gtag", async (event) => {
        return process.env.GA4_GA_ID;
    })

    ipcMain.handle("windowOption", async (event, action) => {
        switch (action) {
            case "minimize":
                win.minimize();
                break;
            case "maximize":
                if (win.isMaximized()) {
                    win.unmaximize();
                } else {
                    win.maximize();
                }
                break;
            case "close":
                win.close();
                break;
        }
    })

    function compareVersions(version1, version2) {
        const v1Parts = version1.split('.').map(Number);
        const v2Parts = version2.split('.').map(Number);

        while (v1Parts.length < 3) v1Parts.push(0);
        while (v2Parts.length < 3) v2Parts.push(0);

        for (let i = 0; i < 3; i++) {
            if (v1Parts[i] > v2Parts[i]) {
                return 1;
            }
            if (v1Parts[i] < v2Parts[i]) {
                return -1;
            }
        }

        return 0;
    }

    // Modpacks
    ipcMain.handle("playModpack", async (event, data) => {
        text = `Playing custom modpack as ${data.user.object.username || data.user.object.name} (Minecraft version: ${data.modpack.version} - Loader: ${data.modpack.loader})`;
        if (data.user.microsoft) {
            const authManager = new Auth("none");
            const xboxManager = await authManager.refresh(data.user.object.meta.refresh);
            const token = await xboxManager.getMinecraft();

            let accounts = accountStorage.get("minecraftAccounts");
            let index = accounts.findIndex(account => account.object.username === data.user.object.username);
            accounts[index].object = token.mclc(true);
            accountStorage.set("minecraftAccounts", accounts);
            data.user.object = token.mclc(true);
        }

        let launchConfig = {};
        if (data.modpack.loader === "forge") {
            launchConfig = await forge.getMCLCLaunchConfig({
                gameVersion: data.modpack.version,
                rootPath: data.modpack.path,
            })
        } else if (data.modpack.loader === "fabric") {
            launchConfig = await fabric.getMCLCLaunchConfig({
                gameVersion: data.modpack.version,
                rootPath: data.modpack.path,
            })
        }

        // Check if minecraft version is >= 1.13
        let javaPath = compareVersions(data.modpack.version, "1.13") >= 0 ? settingsStorage.get("java") || path.join(findJdkFolder(path.join(app.getPath('userData'), 'java')), 'bin', 'java') : settingsStorage.get("java8") || path.join(findJdkFolder(path.join(app.getPath('userData'), 'java8')), 'bin', 'java');

        let options = {
            ...launchConfig,
            authorization: data.user.microsoft ? data.user.object : Authenticator.getAuth(data.user.object.username),
            memory: data.launcher.memory,
            javaPath: javaPath
        }

        launcher.launch(options)
            .then((launch) => {
                launchedClient = launch;
                console.log(launchedClient)
            })
            .catch(console.log);
    })

    modpacks(modpacksStorage, win);
}
