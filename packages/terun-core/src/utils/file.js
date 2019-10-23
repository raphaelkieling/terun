"use strict";
exports.__esModule = true;
var fs = require("fs");
function getUtf8File(path) {
    return fs.readFileSync(path, { encoding: "utf-8" });
}
exports.getUtf8File = getUtf8File;
function writeUtf8File(path, data) {
    return fs.writeFileSync(path, data, { encoding: "utf-8" });
}
exports.writeUtf8File = writeUtf8File;
