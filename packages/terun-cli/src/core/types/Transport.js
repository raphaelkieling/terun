"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
class Transport {
    constructor({ from, to, args, name, validator, debug }) {
        this.from = from;
        this.debug = debug ? true : false;
        this.to = to;
        this.args = args || [];
        this.name = name;
        this.validator = validator ?? null;
    }
}
exports.Transport = Transport;
