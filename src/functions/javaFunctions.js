import {exec} from 'child-process-promise';
import * as path from "node:path";
import DecompressZip from 'decompress-zip';
import * as fs from "node:fs";
const { DownloaderHelper } = require('node-downloader-helper');


function findJdkFolder(folderPath) {
    const files = fs.readdirSync(folderPath);

    const jdkFolder = files.find(file => {
        const filePath = path.join(folderPath, file);
        return fs.statSync(filePath).isDirectory() && file.startsWith('jdk-');
    });

    return jdkFolder ? path.join(folderPath, jdkFolder) : null;
}
export function checkJavaInstallation (app){
    return new Promise((resolve, reject) => {
        let filePath = path.join(findJdkFolder(path.join(app.getPath('userData'), 'java')), 'bin', 'java');

        console.log(filePath)
        exec(`"${path.normalize(filePath)}" -version`)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

export function installJava (app, win, settingsStorage) {
    return new Promise((resolve, reject) => {
        let url, destination;
        if (process.platform === 'win32') {
            url = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.4%2B7/OpenJDK21U-jre_x64_windows_hotspot_21.0.4_7.zip";
            destination = path.join(app.getPath('userData'), 'OpenJDK21U-jre_x64_windows_hotspot_21.0.4_7.zip');
        } else if (process.platform === 'darwin') {
            url = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.4%2B7/OpenJDK21U-jre_" + process.arch === 'arm' || process.arch === 'arm64' ? 'aarch64' : 'x64' + "_mac_hotspot_21.0.4_7.tar.gz";
            destination = path.join(app.getPath('userData'), 'OpenJDK21U-jre_' + process.arch === 'arm' || process.arch === 'arm64' ? 'aarch64' : 'x64' + '_mac_hotspot_21.0.4_7.tar.gz');
        } else if (process.platform === 'linux') {
            url = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.4%2B7/OpenJDK21U-jre_" + process.arch === 'arm' || process.arch === 'arm64' ? 'aarch64' : 'x64' + "_linux_hotspot_21.0.4_7.tar.gz"
            destination = path.join(app.getPath('userData'), 'OpenJDK21U-jre_' + process.arch === 'arm' || process.arch === 'arm64' ? 'aarch64' : 'x64' + '_linux_hotspot_21.0.4_7.tar.gz');
        }


        let dl = new DownloaderHelper(url, app.getPath('userData'));
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
                    settingsStorage.set('java', path.join(findJdkFolder(path.join(app.getPath('userData'), 'java')), 'bin', 'java'));
                    win.setProgressBar(0)
                    resolve();
                });
                unzipper.extract({
                    path: path.join(app.getPath('userData'), 'java')
                })
            } else if (process.platform === 'darwin' || process.platform === 'linux') {
                exec(`tar -xvf ${destination} -C ${path.join(app.getPath('userData'), 'java')}`)
                    .then((result) => {
                        settingsStorage.set('java', path.join(findJdkFolder(path.join(app.getPath('userData'), 'java')), 'bin', 'java'));
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

    })
}