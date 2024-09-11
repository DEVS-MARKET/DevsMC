import {app, ipcMain} from "electron";
import {fabric, forge} from "tomate-loaders";
import path from "node:path";
import fs from "fs";
import {CurseforgeV1Client, FileModLoaderType} from '@xmcl/curseforge'
import {toRaw} from "vue";
const curseforge = new CurseforgeV1Client(`$2a$10$x1B.2vpaWS7PUp2l.cm/SO6WEVNzKy078TmLib6n2UIm4./UDTMpG`)

export default (modpacksStorage) => {
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

    ipcMain.handle("getMods", async (event, index, pageIndex, searchText) => {
        let modpack = modpacksStorage.get("modpacks")[index];
        let searchParams = {
            gameVersion: modpack.version,
            modLoaderType: modpack.loader === "forge" ? FileModLoaderType.Forge : FileModLoaderType.Fabric,
            index: pageIndex !== 0 ? pageIndex * 10 : 0,
            searchFilter: searchText || "",
            pageSize: 10
        };

        let mods = await curseforge.searchMods(searchParams);
        const pageSize = mods.pagination.pageSize
        const total = mods.pagination.totalCount
        const totalPages = Math.ceil(total / pageSize)

        for (const mod of mods.data) {
            mod.details = await curseforge.getMod(mod.id)
        }

        console.log({
            pageIndex: pageIndex !== 1 ? pageIndex * 10 : 0,
            total: total,
            totalPages: totalPages,
            currentPage: pageIndex || 0,
            pagination: pageIndex !== 0 ? pageIndex * 10 : 0,
        })

        return {
            mods: mods.data,
            total: total,
            totalPages: totalPages,
            currentPage: pageIndex || 0
        }
    })
}