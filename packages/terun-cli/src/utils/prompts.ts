import prompts from "prompts";
import { Utils } from "@terun/core";

/**
 * Exit application with CTRL+C for example
 */
export function exitWithMessage() {
  Utils.Log.warn("Application has been exited");
  process.exit(1);
}

export function onCancelPromps() {
  exitWithMessage();
}

export const defaultConfig = {
  onCancel: onCancelPromps,
};

export async function canOverride(): Promise<boolean> {
  const result = await prompts(
    {
      type: "toggle",
      message: "File already exists, can override?",
      initial: false,
      name: "override",
    },
    defaultConfig
  );

  return result["override"];
}

export function createPromp(
  args: prompts.PromptObject
): Promise<prompts.Answers<any>> {
  return prompts(args, defaultConfig);
}
