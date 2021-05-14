import chalk from 'chalk';
import debugLibrary from 'debug';

const colorWarning = chalk.keyword('orange');
const colorError = chalk.bold.red;
const colorSuccess = chalk.bold.green;
const colorInfo = chalk.blueBright;

export const log = console.log;

export function prettyJSON(value: Record<string, unknown>): void {
    log(JSON.stringify(value, null, 2));
}

export function warn(value: string): void {
    log(colorWarning(value, '\n'));
}

export function error(value: string): void {
    log(colorError(value, '\n'));
}

export function success(value: string): void {
    log(colorSuccess(value, '\n'));
}

export function info(value: string): void {
    log(colorInfo(value, '\n'));
}

export function debug(namespace = 'terun'): debugLibrary.Debugger {
    return debugLibrary(namespace);
}
