import chalk from 'chalk';

export * as File from './file';
export * as Log from './log';
export * as Prompts from './prompts';
export * as StringUtils from './string';

export function getCurrentFolderPath() {
    return process.cwd();
}

export function printLogo(version: string): Promise<void> {
    return new Promise((resolve) => {
        console.log(
            chalk.green(`
  █████                                            
  ░░███                                             
  ███████    ██████  ████████  █████ ████ ████████  
░░░███░    ███░░███░░███░░███░░███ ░███ ░░███░░███ 
  ░███    ░███████  ░███ ░░░  ░███ ░███  ░███ ░███ 
  ░███ ███░███░░░   ░███      ░███ ░███  ░███ ░███ 
  ░░█████ ░░██████  █████     ░░████████ ████ █████
    ░░░░░   ░░░░░░  ░░░░░       ░░░░░░░░ ░░░░ ░░░░░ 

Version: ${version}     
--------------------------------------          
       `),
        );
        resolve();
    });
}
