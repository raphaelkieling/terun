import prompts from 'prompts';
import { success, warn } from './log';

/**
 * By default will use the status code 1
 * @param status - Exist process code
 */
export function exitProcess(status = 1): void {
    process.exit(status);
}

/**
 * Exit application with CTRL+C for example
 */
export function exitWithMessage(): void {
    warn('Application has been exited');
    exitProcess(130);
}

export function onCancelPromps(): void {
    exitWithMessage();
}

export const defaultConfig = {
    onCancel: onCancelPromps,
};

export async function canOverride(): Promise<boolean> {
    const result = await prompts(
        {
            type: 'toggle',
            message: 'File already exists, can override?',
            initial: false,
            name: 'override',
        },
        defaultConfig,
    );

    return result['override'];
}

export function createPromp(args: prompts.PromptObject): Promise<prompts.Answers<string>> {
    return prompts(args, defaultConfig);
}

export function getCurrentFolderPath(): string {
    return process.cwd();
}

export function printLogo(version: string): void {
    success(`
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
`);
}
