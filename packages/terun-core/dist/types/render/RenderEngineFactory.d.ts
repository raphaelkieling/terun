import { IRenderEngine } from "../interfaces/IRenderEngine";
import { EngineConfigOption } from '../interfaces/IConfig';
export default abstract class RenderEngineFactory {
    static createMustache(): IRenderEngine;
    static createLiquid(): IRenderEngine;
    static make(type: EngineConfigOption): IRenderEngine;
}
