"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var utils_1 = require("./utils");
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
    ConfigReader.CONFIG_FILE_NAME = 'terun.js';
    return ConfigReader;
}());
exports.ConfigReader = ConfigReader;
