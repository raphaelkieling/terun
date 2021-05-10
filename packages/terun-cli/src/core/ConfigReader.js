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
exports.ConfigReader = void 0;
const path = __importStar(require("path"));
const utils_1 = require("../utils");
class ConfigReader {
    static find() {
        try {
            const configPath = path.join(utils_1.Prompts.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return require(configPath);
        }
        catch (err) {
            return null;
        }
    }
    static exist() {
        try {
            const configPath = path.join(utils_1.Prompts.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return utils_1.File.existFile(configPath);
        }
        catch (err) {
            return false;
        }
    }
    static create(data) {
        const configPath = path.join(utils_1.Prompts.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
        return utils_1.File.writeUtf8File(configPath, data);
    }
}
exports.ConfigReader = ConfigReader;
ConfigReader.CONFIG_FILE_NAME = 'terun.js';
