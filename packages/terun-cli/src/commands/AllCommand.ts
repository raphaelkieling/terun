import { Command } from "./Command";
import { IConfigExternal } from '@terun/core/dist/types/interfaces/IConfigExternal'
import { Utils, Generator } from '@terun/core'
import { ConfigReader } from "../ConfigReader";
import * as prompts from "prompts";
import { Transport } from "@terun/core/dist/types/Transport";
import { IArgs } from "@terun/core/dist/types/interfaces/IArgs";
import * as fs from 'fs';
import { canOverride } from '../utils/prompts';

export class AllCommand extends Command {
    private config: IConfigExternal | null = null;

    constructor() {
        super('commands');
    }

    configure(): void { }

    async execute(): Promise<any> {
        this.config = ConfigReader.find();

        if (!this.config) {
            Utils.Log.error("Config file terun.js not found");
            return;
        }

        try {
            const commands: string[] = Object.keys(this.config.commands);
            for (const command of commands) {
                Utils.Log.success(`- ${command}`);
            }
        } catch (e) {
            Utils.Log.error(e);
        }
    }
}