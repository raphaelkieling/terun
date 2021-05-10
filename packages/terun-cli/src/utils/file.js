"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDir = exports.existFile = exports.writeUtf8File = exports.getUtf8File = void 0;
const fs_1 = require("fs");
const fx = __importStar(require("mkdir-recursive"));
const path_1 = require("path");
function getUtf8File(path) {
    return fs_1.readFileSync(path, { encoding: 'utf-8' });
}
exports.getUtf8File = getUtf8File;
function writeUtf8File(path, data) {
    return fs_1.writeFileSync(path, data, { encoding: 'utf-8' });
}
exports.writeUtf8File = writeUtf8File;
function existFile(path) {
    return fs_1.existsSync(path);
}
exports.existFile = existFile;
/**
 * Create a path folders in a recursive way. Allow unix and window so.
 * @param path
 */
function createDir(path) {
    fx.mkdirSync(path_1.join(...path.split(/[\/\\]/).slice(0, -1)));
}
exports.createDir = createDir;
