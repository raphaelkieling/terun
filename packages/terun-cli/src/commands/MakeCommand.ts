import { Command } from "./Command";
import { IConfigExternal } from '@terun/core/dist/types/interfaces/IConfigExternal'
import { Utils, Generator } from '@terun/core'
import { ConfigReader } from "../ConfigReader";
import * as prompts from "prompts";
import { Transport } from "@terun/core/dist/types/Transport";
import { IArgs } from "@terun/core/dist/types/interfaces/IArgs";
import * as fs from 'fs';
import { canOverride, defaultConfig } from '../utils/prompts';
import ArgsMapper from "../dataMapper/ArgsMapper";

export class MakeCommand extends Command {
    private config: IConfigExternal | null = null;

    constructor() {
        super('make');
    }

    configure(): void {
        this
            .readParam('make')
            .readParam('override');
    }

    private async getArgsWithPrompts(args: IArgs[]): Promise<object> {
        const params: any = {};
        for (const arg of args) {
            const result = await prompts({
                type: "text",
                message: arg.label,
                name: arg.variable,
                initial: arg.default
            }, defaultConfig);

            params[arg.variable] = result[arg.variable];
        }
        return params;
    }

    async execute(): Promise<any> {
        try {
            this.config = ConfigReader.find();

            if (!this.config) {
                Utils.Log.error("Config file terun.js not found");
                return;
            }

            const commandName = this.params.get('make');

            const generator = new Generator(this.config);
            const command = generator.getCommand(commandName);

            if (command) {
                let globalSource = {};

                if (command.plugins) {
                    for (const plugin of command.plugins) {
                        generator.pluginManager.addPlugin(plugin);
                    }
                }

                if (command.args) {
                    command.args = ArgsMapper.fromList(command.args);
                    Utils.Log.log("[Global arguments]");
                    globalSource = await this.getArgsWithPrompts(command.args);
                }

                const transports: Transport[] = command.transports;

                for (const transport of transports) {
                    Utils.Log.log(`[process]: ${transport.name || transport.from}`);

                    transport.args = ArgsMapper.fromList(transport.args);
                    const transportSource = await this.getArgsWithPrompts(transport.args);

                    const resolvedPaths = generator.resolvePaths({ transport, globalSource, transportSource });

                    /**
                     * The file need exists and command override is different that true
                     */
                    const defaultIsOverride = this.params.get('override') !== true;
                    const fileExists = fs.existsSync(resolvedPaths.to);
                    if (fileExists && defaultIsOverride) {
                        const override = await canOverride();
                        if (!override) {
                            Utils.Log.warn("Relax, file skyped");
                            return;
                        };
                    }

                    generator.transport({
                        transportSource,
                        globalSource,
                        transport,
                    });

                    Utils.Log.success("File transported with success!");
                }
            } else {
                Utils.Log.error(`Command [${commandName}] not found on config`)
            }
        } catch (e) {
            Utils.Log.error(e);
        }
    }
}