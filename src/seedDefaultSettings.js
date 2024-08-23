import path from "node:path";

export default (settingsStorage, app) => {
    if (!settingsStorage.get('path')) {
        settingsStorage.set('path', path.join(app.getPath('userData'), '.minecraft'));
    }

    if (!settingsStorage.get('memory')) {
        settingsStorage.set('memory', {min: 1, max:2});
    }
}