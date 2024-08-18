import {exec} from 'child-process-promise';
import * as path from "node:path";
import DecompressZip from 'decompress-zip';
import * as fs from "node:fs";
const { DownloaderHelper } = require('node-downloader-helper');


function findJdkFolder(folderPath) {
    const files = fs.readdirSync(folderPath);

    const jdkFolder = files.find(file => {
        const filePath = path.join(folderPath, file);
        return fs.statSync(filePath).isDirectory() && file.startsWith('zulu');
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
            url = "https://cdn.azul.com/zulu/bin/zulu21.36.17-ca-jre21.0.4-win_x64.zip";
            destination = path.join(app.getPath('userData'), 'zulu21.36.17-ca-jre21.0.4-win_x64.zip');
        } else if (process.platform === 'darwin') {
            url = "https://cdn.azul.com/zulu/bin/zulu21.36.17-ca-jre21.0.4-macosx_x64.zip";
            destination = path.join(app.getPath('userData'), 'zulu21.36.17-ca-jre21.0.4-macosx_x64.zip');
        } else if (process.platform === 'linux') {
            url = "https://cdn.azul.com/zulu/bin/zulu21.36.17-ca-jre21.0.4-linux_x64.zip"
            destination = path.join(app.getPath('userData'), 'zulu21.36.17-ca-jre21.0.4-linux_x64.zip');
        }


        let dl = new DownloaderHelper(url, app.getPath('userData'));
        dl.on('progress', function (stats) {
            win.setProgressBar(stats.progress);
        })
        dl.on('end', function () {
            win.setProgressBar(-1);
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
        });

        dl.start().catch((error) => {
            reject(error);
        });

    })
}