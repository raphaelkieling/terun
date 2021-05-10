import prompts from 'prompts';

/**
 * By default will use the status code 1
 * @param status - Exist process code
 */
export function exitProcess(status = 1): void {
    process.exit(status);
}

export const defaultConfig = {
    onCancel: () => exitProcess(130),
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
