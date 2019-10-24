"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command_1 = require("../Command");
var Config_1 = require("../Config");
var ConfigMapper = /** @class */ (function () {
    function ConfigMapper() {
    }
    ConfigMapper.fromConfigExternal = function (options) {
        var config = new Config_1.Config();
        config.basePath = options.basePath || config.basePath;
        config.tag = options.tag || config.tag;
        config.engine = options.engine || config.engine;
        for (var _i = 0, _a = Object.entries(options.commands); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], command = _b[1];
            config.commands[key] = new Command_1.Command(command);
        }
        return config;
    };
    return ConfigMapper;
}());
exports.ConfigMapper = ConfigMapper;
