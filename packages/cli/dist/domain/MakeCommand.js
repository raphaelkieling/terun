"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Command_1 = require("./Command");
var core_1 = require("@terun/core");
var ConfigReader_1 = require("../ConfigReader");
var MakeCommand = /** @class */ (function (_super) {
    __extends(MakeCommand, _super);
    function MakeCommand() {
        return _super.call(this, 'make') || this;
    }
    MakeCommand.prototype.configure = function () {
        console.log('configurando v2');
    };
    MakeCommand.prototype.execute = function () {
        var config = ConfigReader_1.ConfigReader.find();
        console.log(config);
        if (!config) {
            core_1.Utils.Log.error("Config file terun.js not found");
            return;
        }
        var generator = new core_1.Generator(config);
        generator.initTransport('example');
    };
    return MakeCommand;
}(Command_1.Command));
exports.MakeCommand = MakeCommand;
