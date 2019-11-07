import chalk from 'chalk';

export function getCurrentFolderPath() {
    return process.cwd();
}

export function printLogo(): Promise<void> {
    return new Promise((resolve) => {
        console.log(chalk.green('-> Terun\n'))
        resolve();
    })
}