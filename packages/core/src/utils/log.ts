import chalk from 'chalk';

const colorWarning = chalk.keyword('orange');
const colorError = chalk.bold.red;
export const log = console.log

export function warn(value: string): void {
    log(colorWarning(value));
}

export function error(value: string): void {
    log(colorError(value));
}