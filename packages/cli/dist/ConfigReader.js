"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var utils_1 = require("./utils");
var core_1 = require("@terun/core");
var ConfigReader = /** @class */ (function () {
    function ConfigReader() {
    }
    ConfigReader.find = function () {
        try {
            var configPath = path.join(utils_1.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return core_1.Utils.File.getUtf8File(configPath);
        }
        catch (err) {
            return null;
        }
    };
    ConfigReader.CONFIG_FILE_NAME = 'terun.js';
    return ConfigReader;
}());
exports.ConfigReader = ConfigReader;
