import {exec} from 'child-process-promise';
import * as path from "node:path";
import DecompressZip from 'decompress-zip';
import * as fs from "node:fs";
const { DownloaderHelper } = require('node-downloader-helper');
import {Notification} from "electron";


function findJdkFolder(folderPath) {
    const files = fs.readdirSync(folderPath);

    const jdkFolder = files.find(file => {
        const filePath = path.join(folderPath, file);
        return fs.statSync(filePath).isDirectory() && file.startsWith('jdk-') || fs.statSync(filePath).isDirectory() && file.startsWith('jdk');
    });

    return jdkFolder ? path.join(folderPath, jdkFolder) : null;
}
export function checkJavaInstallation (app, settingsStorage) {
    return new Promise((resolve, reject) => {
        if (process.platform === 'win32') {
            let filePath = settingsStorage.get('java') ? settingsStorage.get('java') : path.join(findJdkFolder(path.join(app.getPath('userData'), 'java')), 'bin', 'java');

            exec(`"${path.normalize(filePath)}" -version`)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        } else if (process.platform === 'darwin') {
            let filePath = settingsStorage.get('java') ? settingsStorage.get('java') : path.join(findJdkFolder(path.join(app.getPath('userData'), 'java')), 'Contents', 'Home', 'bin', 'java');
            exec(`"${path.normalize(filePath)}" -version`)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        } else if (process.platform === 'linux') {
            let filePath = settingsStorage.get('java') ? settingsStorage.get('java') : path.join(findJdkFolder(path.join(app.getPath('userData'), 'java')), 'bin', 'java');
            exec(`"${path.normalize(filePath)}" -version`)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        }
    })
}

function downloadJavaByVersion (app, win, settingsStorage, version) {
    return new Promise((resolve, reject) => {
        let url, destination;

        if (process.platform === 'win32') {
            if (version === 21) {
                url = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.4%2B7/OpenJDK21U-jre_" + (process.arch === 'arm' || process.arch === 'arm64' ? 'aarch64' : 'x64') + "_windows_hotspot_21.0.4_7.zip";
                destination = path.join(app.getPath('userData'), 'OpenJDK21U-jre_' + (process.arch === 'arm' || process.arch === 'arm64' ? 'aarch64' : 'x64') + '_windows_hotspot_21.0.4_7.zip');
            } else if (version === 8) {
                if (process.arch === "x64") {
                    url = "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_x64_windows_hotspot_8u422b05.zip"
                    destination = path.join(app.getPath('userData'), 'OpenJDK8U-jre_x64_windows_hotspot_8u422b05.zip');
                }
            }
        } else if (process.platform === 'darwin') {
            if (version === 21) {
                url = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.4%2B7/OpenJDK21U-jre_" + (process.arch === 'arm' || process.arch === 'arm64' ? 'aarch64' : 'x64') + "_mac_hotspot_21.0.4_7.tar.gz";
                destination = path.join(app.getPath('userData'), 'OpenJDK21U-jre_' + (process.arch === 'arm' || process.arch === 'arm64' ? 'aarch64' : 'x64') + '_mac_hotspot_21.0.4_7.tar.gz');
            } else if (version === 8) {
                if (process.arch === "x64") {
                    url = "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_x64_mac_hotspot_8u422b05.zip"
                    destination = path.join(app.getPath('userData'), 'OpenJDK8U-jre_x64_mac_hotspot_8u422b05.zip');
                }
            }
        } else if (process.platform === 'linux') {
            if (version === 21) {
                url = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.4%2B7/OpenJDK21U-jre_" + (process.arch === 'arm' || process.arch === 'arm64' ? 'aarch64' : 'x64') + "_linux_hotspot_21.0.4_7.tar.gz"
                destination = path.join(app.getPath('userData'), 'OpenJDK21U-jre_' + (process.arch === 'arm' || process.arch === 'arm64' ? 'aarch64' : 'x64') + '_linux_hotspot_21.0.4_7.tar.gz');
            } else if (version === 8) {
                if (process.arch === "x64") {
                    url = "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_x64_linux_hotspot_8u422b05.zip"
                    destination = path.join(app.getPath('userData'), 'OpenJDK8U-jre_x64_linux_hotspot_8u422b05.zip');

                }
            }
        }

        if (url) {
            let dl = new DownloaderHelper(url, app.getPath('userData'));

            let directory = version === 21 ? 'java' : `java${version}`;
            dl.on('progress', function (stats) {
                win.setProgressBar(stats.progress);
            })
            dl.on('end', function () {
                win.setProgressBar(0);
                if (process.platform === 'win32') {
                    let unzipper = new DecompressZip(destination);
                    unzipper.on('progress', function (fileIndex, fileCount) {
                        win.setProgressBar(fileIndex / fileCount);
                    });
                    unzipper.on('error', function (error) {
                        reject(error);
                    });
                    unzipper.on('extract', function () {
                        settingsStorage.set(directory, path.join(findJdkFolder(path.join(app.getPath('userData'), directory)), 'bin', 'javaw'));
                        win.setProgressBar(0)
                        resolve();
                    });
                    unzipper.extract({
                        path: path.join(app.getPath('userData'), directory)
                    })
                } else if (process.platform === 'darwin' || process.platform === 'linux') {
                    fs.mkdirSync(path.join(app.getPath('userData'), directory), {recursive: true});
                    exec(`tar -xvf "${destination}" -C "${path.join(app.getPath('userData'), directory)}"`)
                        .then((result) => {
                            if(process.platform === 'darwin') {
                                settingsStorage.set(directory, path.join(findJdkFolder(path.join(app.getPath('userData'), directory)), 'Contents', 'Home', 'bin', 'javaw'));
                            } else {
                                settingsStorage.set(directory, `${path.join(findJdkFolder(path.join(app.getPath('userData'), directory)), 'bin', 'javaw')}`);
                            }
                            resolve(result);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }

            });

            dl.start().catch((error) => {
                reject(error);
            });
        } else {
            new Notification({
                title: "Java 8 cannot  be installed",
                icon: path.join(__dirname, '/assets/icon.png'),
                body: "Java 8 cannot be installed on your system because u use platform " + process.platform + " and arch " + process.arch,
            }).show();

            resolve();
        }
    })
}

export function installJava (app, win, settingsStorage) {
    return new Promise((resolve, reject) => {
        downloadJavaByVersion(app, win, settingsStorage, 21)
            .then(() => {
                downloadJavaByVersion(app, win, settingsStorage, 8)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });

    })
}


