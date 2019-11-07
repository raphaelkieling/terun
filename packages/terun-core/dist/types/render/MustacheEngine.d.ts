import { IRenderEngine } from "../interfaces/IRenderEngine";
export declare class MustacheEngine implements IRenderEngine {
    readonly engine: any;
    render(template: string, args: any, tags: string[]): Promise<any>;
}
