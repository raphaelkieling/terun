"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigMapper = void 0;
const Command_1 = require("../../../core/types/Command");
const Config_1 = require("../../../core/types/Config");
class ConfigMapper {
    static toInternalConfig(options) {
        const config = new Config_1.Config();
        config.basePath = options.basePath || config.basePath;
        config.tag = options.tag || config.tag;
        config.engine = options.engine || config.engine;
        for (const [key, command] of Object.entries(options.commands)) {
            config.commands[key] = new Command_1.Command(command);
        }
        return config;
    }
}
exports.ConfigMapper = ConfigMapper;
