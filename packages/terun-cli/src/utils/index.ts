import * as logo from 'ascii-art';

export function getCurrentFolderPath() {
    return process.cwd();
}

export function printLogo(): Promise<void> {
    return new Promise((resolve) => {
        console.log("-> Terun");

        resolve();
    })
}