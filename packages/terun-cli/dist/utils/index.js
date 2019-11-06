"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentFolderPath() {
    return process.cwd();
}
exports.getCurrentFolderPath = getCurrentFolderPath;
function printLogo() {
    return new Promise(function (resolve) {
        console.log("-> Terun");
        resolve();
    });
}
exports.printLogo = printLogo;
