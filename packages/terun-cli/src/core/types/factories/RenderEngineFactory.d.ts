import { IRenderEngine } from '../interfaces/IRenderEngine';
import { EngineType } from '../interfaces/IConfig';
export default class RenderEngineFactory {
    static createMustache(): IRenderEngine;
    static createLiquid(): IRenderEngine;
    static make(type: EngineType): IRenderEngine;
}
