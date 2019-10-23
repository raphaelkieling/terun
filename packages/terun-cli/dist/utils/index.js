"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logo = require("ascii-art");
function getCurrentFolderPath() {
    return process.cwd();
}
exports.getCurrentFolderPath = getCurrentFolderPath;
function printLogo() {
    return new Promise(function (resolve) {
        logo.font("terun", "Doom", function (rendered) {
            console.log(rendered);
            resolve();
        });
    });
}
exports.printLogo = printLogo;
