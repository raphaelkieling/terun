import { IRenderEngine } from '../interfaces/IRenderEngine';
import { defaultPipelines } from '../Pipeline';
import { Liquid } from 'liquidjs';

export class LiquidEngine implements IRenderEngine {
    public readonly engine: Liquid = new Liquid();

    public async render(template: string, args: Record<string, unknown>): Promise<string> {
        args = Object.assign(args, defaultPipelines);
        return await this.engine.parseAndRender(template, args);
    }
}
