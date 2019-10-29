import * as prompts from "prompts";
/**
 * Exit application with CTRL+C for example
 */
export declare function exitWithMessage(): void;
export declare function onCancelPromps(): void;
export declare const defaultConfig: {
    onCancel: typeof onCancelPromps;
};
export declare function canOverride(): Promise<boolean>;
export declare function createPromp(args: prompts.PromptObject): Promise<prompts.Answers<any>>;
