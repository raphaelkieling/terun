import { Command } from "./Command";
import { IConfig } from "./interfaces/IConfig";

export class Config implements IConfig {
  public tag: string[];
  public basePath: string;
  public engine: "mustache" | "liquid" = "mustache";
  public commands: { [key: string]: Command };

  constructor() {
    this.basePath = ".";
    this.commands = {};
    this.tag = this.getDefaultTags();
  }

  private getDefaultTags() {
    return ["{{", "}}"];
  }
}
