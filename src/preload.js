import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('devsApi', {
    login: async () => {
        return await ipcRenderer.invoke('login');
    },
    nopremium: async (username) => {
        return await ipcRenderer.invoke('login-nopremium', username);
    },
    getMinecraftAccounts: async () => {
        return await ipcRenderer.invoke('getMinecraftAccounts');
    },
    removeAccount: async (index) => {
        return await ipcRenderer.invoke('removeAccount', index);
    },


    // Utility functions
    sendNotification: async (title, body) => {
        return await ipcRenderer.invoke('sendNotification', title, body);
    },
    changeTitle: async (title) => {
        document.title = title + " - DevsMC Launcher";
        document.getElementById('window-title').innerHTML = title + " - DevsMC Launcher";
    },
    windowOption: async (option) => {
      return await ipcRenderer.invoke('windowOption', option);
    },
    runGame: async (data) => {
        return await ipcRenderer.invoke('runGame', JSON.parse(data));
    },
    stopGame: async () => {
        return await ipcRenderer.invoke('stopGame');
    },
    getSystemPlatform: () => {
        return ipcRenderer.invoke('getPlatform');
    },
    getVersions: async () => {
        return await ipcRenderer.invoke('getMinecarftVersions');
    },
    getLogsFiles: async () => {
        return await ipcRenderer.invoke('getLogsFiles');
    },
    getLogContent: async (file) => {
        return await ipcRenderer.invoke('getLogContent', file);
    },
    getAppSettings: async () => {
        return await ipcRenderer.invoke('getSettings');
    },
    setAppSetting: async (key, value) => {
        return await ipcRenderer.invoke('setSettingValue', key, value);
    },
    getSettingValue: async (key) => {
        return await ipcRenderer.invoke('getSettingValue', key);
    },
    openDirectory: async (path) => {
        return await ipcRenderer.invoke('openDirectory', path);
    },
    getEnv: async () => {
        return await ipcRenderer.invoke('getEnv');
    },
    getInstallationStatus: async () => {
        return await ipcRenderer.invoke('getInstallationStatus')
    },
    getGaTags: async () => {
        return await ipcRenderer.invoke('gtag')
    },

    // Modpacks
    getForgeVersions: async () => {
        return await ipcRenderer.invoke('getForgeVersions');
    },
    getFabricVersions: async () => {
        return await ipcRenderer.invoke('getFabricVersions');
    },
    getModpacks: async () => {
        return await ipcRenderer.invoke('getModpacks');
    },
    getModpack: async (index) => {
        return await ipcRenderer.invoke('getModpack', index);
    },
    addModpack: async (modpack) => {
        return await ipcRenderer.invoke('addModpack', modpack);
    },
    removeModpack: async (name) => {
        return await ipcRenderer.invoke('removeModpack', name);
    },
    updateModpack: async (modpack) => {
        return await ipcRenderer.invoke('updateModpack', modpack);
    },
    getMods: async (modpack, pageIndex, search) => {
        return await ipcRenderer.invoke('getMods', modpack, pageIndex, search);
    },



    // Main into renderer communication
    onLogReceive: (callback) => ipcRenderer.on('log', (event, data) => callback(data)),
    onClosedGame: (callback) => ipcRenderer.on('closedGame', (event, data) => callback(data)),
    onDownloading: (callback) => ipcRenderer.on('downloading', (event, data) => callback(data)),
});