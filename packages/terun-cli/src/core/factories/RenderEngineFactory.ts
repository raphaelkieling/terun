import { IRenderEngine } from '../interfaces/IRenderEngine';
import { EngineType } from '../interfaces/IConfig';
import { MustacheEngine } from '../engines/MustacheEngine';
import { LiquidEngine } from '../engines/LiquidEngine';

export default class RenderEngineFactory {
    public static make(type?: EngineType): IRenderEngine {
        if (type === EngineType.MUSTACHE) {
            return new MustacheEngine();
        }

        if (type === EngineType.LIQUID) {
            return new LiquidEngine();
        }

        return new MustacheEngine();
    }
}
