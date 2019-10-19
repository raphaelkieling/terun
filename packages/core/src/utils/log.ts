import chalk from 'chalk';

const colorWarning = chalk.keyword('orange');
const colorError = chalk.bold.red;
const colorSuccess = chalk.bold.green;
export const log = console.log

export function warn(value: string): void {
    log(colorWarning(value, '\n'));
}

export function error(value: string): void {
    log(colorError(value, '\n'));
}

export function success(value: string): void {
    log(colorSuccess(value, '\n'));
}