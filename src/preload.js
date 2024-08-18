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
    },
    runGame: async (data) => {
        return await ipcRenderer.invoke('runGame', data);
    },
    getSystemPlatform: () => {
        return ipcRenderer.invoke('getPlatform');
    },
    getVersions: async () => {
        return await ipcRenderer.invoke('getMinecarftVersions');
    },


    // Main into renderer communication
    onLogReceive: (callback) => ipcRenderer.on('log', (event, data) => callback(data)),
});