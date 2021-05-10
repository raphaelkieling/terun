import { IRenderEngine } from '../interfaces/IRenderEngine';
import { Liquid } from 'liquidjs';
export declare class LiquidEngine implements IRenderEngine {
    readonly engine: Liquid;
    render(template: string, args: Record<string, unknown>): Promise<string>;
}
