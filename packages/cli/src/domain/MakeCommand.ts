import { Command } from "./Command";
import { IConfigExternal } from '@terun/core/dist/types/interfaces/IConfigExternal'
import { Utils, Generator } from '@terun/core'
import { ConfigReader } from "../ConfigReader";
import * as prompts from "prompts";
import { Transport } from "@terun/core/dist/types/Transport";
import { IArgs } from "@terun/core/dist/types/interfaces/IArgs";
import * as fs from 'fs';
import { canOverride } from '../utils/prompts';

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
            });

            params[arg.variable] = result[arg.variable];
        }
        return params;
    }

    async execute(): Promise<any> {
        this.config = ConfigReader.find();
        if (!this.config) {
            Utils.Log.error("Config file terun.js not found");
            return;
        }

        const commandName = this.params.get('make');
        try {
            const generator = new Generator(this.config);
            const command = generator.getCommand(commandName);

            if (command) {
                let globalSource = {};
                if (command.args) {
                    Utils.Log.log("[Global arguments]");
                    globalSource = await this.getArgsWithPrompts(command.args);
                }

                const transports: Transport[] = command.transports;

                for (const transport of transports) {
                    Utils.Log.log(`[process]: ${transport.name || transport.from}`);

                    const transportSource = await this.getArgsWithPrompts(transport.args);

                    const resolvedPaths = generator.resolvePaths({ transport, globalSource, transportSource });

                    /**
                     * The file need exists and command override is different that true
                     */
                    if (fs.existsSync(resolvedPaths.to) && this.params.get('override') !== true) {
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

                    Utils.Log.success("File transported with success!")
                }
            }
        } catch (e) {
            Utils.Log.error(e);
        }
    }
}