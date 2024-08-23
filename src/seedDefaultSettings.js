import path from "node:path";
import fs from "fs";

export default (settingsStorage, app) => {
    if (!settingsStorage.get('path')) {
        settingsStorage.set('path', path.join(app.getPath('userData'), '.minecraft'));
        if (!fs.existsSync(path.join(app.getPath('userData'), '.minecraft'))) {
            fs.mkdirSync(path.join(app.getPath('userData'), '.minecraft'));
        }
    }

    if (!settingsStorage.get('memory')) {
        settingsStorage.set('memory', {min: 1, max:2});
    }
}