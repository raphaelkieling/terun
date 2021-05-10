import prompts from 'prompts';
/**
 * By default will use the status code 1
 * @param status - Exist process code
 */
export declare function exitProcess(status?: number): void;
export declare const defaultConfig: {
    onCancel: () => void;
};
export declare function canOverride(): Promise<boolean>;
export declare function createPromp(args: prompts.PromptObject): Promise<prompts.Answers<string>>;
export declare function getCurrentFolderPath(): string;
