import * as prompts from "prompts";

export async function canOverride(): Promise<boolean> {
    const result = await prompts({
        type: "toggle",
        message: "File already exists, can override?",
        initial: false,
        name: "override"
    });

    return result["override"];
}