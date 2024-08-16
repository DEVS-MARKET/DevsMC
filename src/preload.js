import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('devsApi', {
    login: async () => {
        return await ipcRenderer.invoke('login');
    }
});