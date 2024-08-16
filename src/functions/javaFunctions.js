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

        exec(`${filePath} -version`)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export function installJava (app, win) {
    return new Promise((resolve, reject) => {
        let url, destination;
        if (process.platform === 'win32') {
            url = "https://github.com/adoptium/temurin11-binaries/releases/download/jdk-11.0.24%2B8/OpenJDK11U-jdk_x64_windows_hotspot_11.0.24_8.zip";
            destination = path.join(app.getPath('userData'), 'OpenJDK11U-jdk_x64_windows_hotspot_11.0.24_8.zip');
        } else if (process.platform === 'darwin') {
            url = "https://github.com/adoptium/temurin11-binaries/releases/download/jdk-11.0.24%2B8/OpenJDK11U-jdk_x64_mac_hotspot_11.0.24_8.tar.gz"
            destination = path.join(app.getPath('userData'), 'OpenJDK11U-jdk_x64_mac_hotspot_11.0.24_8.tar.gz');
        } else if (process.platform === 'linux') {
            url = "https://github.com/adoptium/temurin11-binaries/releases/download/jdk-11.0.24%2B8/OpenJDK11U-jdk_x64_linux_hotspot_11.0.24_8.tar.gz"
            destination = path.join(app.getPath('userData'), 'OpenJDK11U-jdk_x64_linux_hotspot_11.0.24_8.tar.gz');
        }


        let dl = new DownloaderHelper(url, app.getPath('userData'));
        dl.on('progress', function (stats) {
            win.setProgressBar(stats.progress);
        })
        dl.on('end', function () {
            win.setProgressBar(-1);
            if (process.platform === 'win32') {
                // extract the zip file
                let unzipper = new DecompressZip(destination);
                unzipper.on('progress', function (fileIndex, fileCount) {
                    win.setProgressBar(fileIndex / fileCount);
                });
                unzipper.on('error', function (error) {
                    reject(error);
                });
                unzipper.on('extract', function () {
                    resolve();
                });
                unzipper.extract({
                    path: path.join(app.getPath('userData'), 'java')
                })
            }

            if (process.platform === 'darwin' || process.platform === 'linux') {
                // extract the tar.gz file
                exec(`tar -xzf ${destination} -C ${path.join(app.getPath('userData'), 'java')}`)
                    .then((result) => {
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