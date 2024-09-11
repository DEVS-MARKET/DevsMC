import {app, ipcMain, ipcRenderer, Notification} from "electron";
import {fabric, forge} from "tomate-loaders";
import path from "node:path";
import fs from "fs";
import {CurseforgeV1Client, FileModLoaderType} from '@xmcl/curseforge'
import {Readable} from "stream";

const curseforge = new CurseforgeV1Client(`$2a$10$x1B.2vpaWS7PUp2l.cm/SO6WEVNzKy078TmLib6n2UIm4./UDTMpG`)

export default (modpacksStorage, win) => {
    ipcMain.handle("getForgeVersions", async (event) => {
        return await forge.listSupportedVersions();
    });

    ipcMain.handle("getFabricVersions", async (event) => {
        return (await fabric.listSupportedVersions()).filter(version => version.stable);
    });

    ipcMain.handle("getModpacks", async (event) => {
        return modpacksStorage.get("modpacks");
    });

    ipcMain.handle("getModpack", async (event, index) => {
        return modpacksStorage.get("modpacks")[index];
    });

    ipcMain.handle("addModpack", async (event, modpack) => {
        const modpacks = modpacksStorage.get("modpacks");
        modpack.path = path.join(app.getPath('userData'), '.modpacks', modpack.name + Date.now());
        modpack.mods = [];
        fs.mkdirSync(modpack.path);
        modpack.updated_at = new Date().toLocaleString();
        modpacks.push(modpack);
        modpacksStorage.set("modpacks", modpacks);
    });

    ipcMain.handle("removeModpack", async (event, name) => {
        const modpacks = modpacksStorage.get("modpacks");
        fs.rmdirSync(modpacks.find(modpack => modpack.name === name).path, {recursive: true});
        modpacks.splice(modpacks.findIndex(modpack => modpack.name === name), 1);
        modpacksStorage.set("modpacks", modpacks);
    });

    ipcMain.handle("updateModpack", async (event, modpack) => {
        const modpacks = modpacksStorage.get("modpacks");
        modpack.updated_at = new Date().toLocaleString();
        modpacks[modpacks.findIndex(modpack => modpack.name === modpack.name)] = modpack;
        modpacksStorage.set("modpacks", modpacks);
    });

    ipcMain.handle("installMod", async (event, modpack, mod_id) => {
        let savedModpack = modpacksStorage.get("modpacks")[modpack];
        let mod = await curseforge.getMod(mod_id);

        if (!fs.existsSync(path.join(savedModpack.path, 'mods'))) {
            fs.mkdirSync(path.join(savedModpack.path, 'mods'));
        }

        let files = (await curseforge.getModFiles({
            gameVersion: savedModpack.version,
            modLoaderType: savedModpack.loader === "forge" ? FileModLoaderType.Forge : FileModLoaderType.Fabric,
            modId: mod_id
        })).data;
        
        if (!files || !files[0].downloadUrl) {
            new Notification({
                title: "Error",
                body: "No file found for this mod version"
            }).show();
        }
        let fileUrl = files[0].downloadUrl;

        let modPath = path.join(savedModpack.path, 'mods', files[0].fileName);
        let file = fs.createWriteStream(modPath);
        let response = await fetch(fileUrl);
        if (!response.ok && !response.body) {
            new Notification({
                title: "Error",
                body: "Error downloading mod file"
            }).show();
        }

        Readable.fromWeb(response.body).pipe(file)
            .on('finish', () => {
                file.close();
                savedModpack.mods.push({
                    name: mod.name,
                });
                modpacksStorage.updateByIndex("modpacks", modpack, savedModpack);
                new Notification({
                    title: "Success",
                    body: `Mod ${mod.name} installed successfully`
                }).show();

                win.webContents.send('modDownloaded');
            });

        return true;
    })

    ipcMain.handle("getMods", async (event, index, pageIndex, searchText) => {
        let modpack = modpacksStorage.get("modpacks")[index];
        let searchParams = {
            gameVersion: modpack.version,
            modLoaderType: modpack.loader === "forge" ? FileModLoaderType.Forge : FileModLoaderType.Fabric,
            index: pageIndex - 1,
            searchFilter: searchText || "",
            pageSize: 10
        };

        let mods = await curseforge.searchMods(searchParams);
        const pageSize = mods.pagination.pageSize
        const total = mods.pagination.totalCount
        const totalPages = Math.ceil(total / pageSize)

        for (const mod of mods.data) {
            mod.details = await curseforge.getMod(mod.id)
            mod.installable = !modpack.mods.find(savedMod => savedMod.name === mod.details.name)
        }

        return {
            mods: mods.data,
            total: total,
            totalPages: totalPages,
            currentPage: pageIndex || 0
        }
    })
}