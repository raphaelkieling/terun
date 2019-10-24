"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var utils_1 = require("./utils");
var core_1 = require("@terun/core");
var ConfigReader = /** @class */ (function () {
    function ConfigReader() {
    }
    ConfigReader.find = function () {
        try {
            var configPath = path.join(utils_1.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return require(configPath);
        }
        catch (err) {
            return null;
        }
    };
    ConfigReader.exist = function () {
        try {
            var configPath = path.join(utils_1.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return fs.existsSync(configPath);
        }
        catch (e) {
            return false;
        }
    };
    ConfigReader.create = function (data) {
        try {
            var configPath = path.join(utils_1.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return fs.writeFileSync(configPath, data, { encoding: 'utf8' });
        }
        catch (e) {
            core_1.Utils.Log.error(e);
        }
    };
    ConfigReader.CONFIG_FILE_NAME = 'terun.js';
    return ConfigReader;
}());
exports.ConfigReader = ConfigReader;