"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
function getCurrentFolderPath() {
    return process.cwd();
}
exports.getCurrentFolderPath = getCurrentFolderPath;
function printLogo() {
    return new Promise(function (resolve) {
        console.log(chalk_1.default.green('-> Terun\n'));
        resolve();
    });
}
exports.printLogo = printLogo;
