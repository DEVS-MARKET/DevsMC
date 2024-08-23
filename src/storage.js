const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

class Store {
    constructor(encryptionKey, configFile) {
        this.encryptionKey = encryptionKey;
        this.algorithm = 'aes-256-cbc';
        this.configFile = configFile;
    }

    encrypt(text) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.getKey(), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + ':' + encrypted;
    }

    decrypt(encryptedText) {
        const [ivHex, encrypted] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, this.getKey(), iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    getKey() {
        return crypto.scryptSync(this.encryptionKey, 'salt', 32);
    }

    getConfigPath() {
        return path.join(app.getPath('userData'), this.configFile);
    }

    getConfig() {
        const configPath = this.getConfigPath();
        if (!fs.existsSync(configPath)) {
            return {};
        }
        const encryptedConfigJson = fs.readFileSync(configPath, 'utf8');
        try {
            const configJson = this.decrypt(encryptedConfigJson);
            return JSON.parse(configJson);
        } catch (error) {
            return {}; // Return an empty object if decryption fails
        }
    }

    saveConfig(config) {
        const configPath = this.getConfigPath();
        const configJson = JSON.stringify(config);
        const encryptedConfigJson = this.encrypt(configJson);
        fs.writeFileSync(configPath, encryptedConfigJson);
    }

    get(key) {
        const configJs = this.getConfig();
        return configJs[key];
    }

    set(key, value) {
        const configJs = this.getConfig();
        configJs[key] = value;
        this.saveConfig(configJs);
    }

    delete(key) {
        const configJs = this.getConfig();
        delete configJs[key];
        this.saveConfig(configJs);
    }

    pushToArray(key, value) {
        const configJs = this.getConfig();
        if (!Array.isArray(configJs[key])) {
            configJs[key] = [];
        }
        configJs[key].push(value);
        this.saveConfig(configJs);
    }

    removeFromArray(key, value) {
        const configJs = this.getConfig();
        if (Array.isArray(configJs[key])) {
            configJs[key] = configJs[key].filter(item => item !== value);
            this.saveConfig(configJs);
        }
    }

    removeFromArrayByIndex(key, index) {
        const configJs = this.getConfig();
        if (Array.isArray(configJs[key])) {
            configJs[key].splice(index, 1);
            this.saveConfig(configJs);
        }
    }

    updateByIndex(key, index, value) {
        const configJs = this.getConfig();
        if (Array.isArray(configJs[key])) {
            configJs[key][index] = value;
            this.saveConfig(configJs);
        }
    }

    getAll() {
        return this.getConfig();
    }
}

export default Store;
