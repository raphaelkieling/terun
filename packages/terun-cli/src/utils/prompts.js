"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentFolderPath = exports.createPromp = exports.canOverride = exports.defaultConfig = exports.exitProcess = void 0;
const prompts_1 = __importDefault(require("prompts"));
/**
 * By default will use the status code 1
 * @param status - Exist process code
 */
function exitProcess(status = 1) {
    process.exit(status);
}
exports.exitProcess = exitProcess;
exports.defaultConfig = {
    onCancel: () => exitProcess(130),
};
async function canOverride() {
    const result = await prompts_1.default({
        type: 'toggle',
        message: 'File already exists, can override?',
        initial: false,
        name: 'override',
    }, exports.defaultConfig);
    return result['override'];
}
exports.canOverride = canOverride;
function createPromp(args) {
    return prompts_1.default(args, exports.defaultConfig);
}
exports.createPromp = createPromp;
function getCurrentFolderPath() {
    return process.cwd();
}
exports.getCurrentFolderPath = getCurrentFolderPath;
