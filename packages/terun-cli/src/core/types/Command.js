"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const Transport_1 = require("./Transport");
class Command {
    constructor({ args, transports, plugins, hook }) {
        this.args = args || [];
        this.hook = hook;
        this.plugins = plugins || [];
        this.transports = transports.map((item) => new Transport_1.Transport(item));
    }
}
exports.Command = Command;
