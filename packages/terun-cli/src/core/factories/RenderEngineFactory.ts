import { IRenderEngine } from '../interfaces/IRenderEngine';
import { EngineType } from '../interfaces/IConfig';
import { MustacheEngine } from '../engines/MustacheEngine';
import { LiquidEngine } from '../engines/LiquidEngine';

export default class RenderEngineFactory {
    public static createMustache(): IRenderEngine {
        return new MustacheEngine();
    }

    public static createLiquid(): IRenderEngine {
        return new LiquidEngine();
    }

    public static make(type: EngineType): IRenderEngine {
        if (type === EngineType.MUSTACHE) {
            return RenderEngineFactory.createMustache();
        }

        if (type === EngineType.LIQUID) {
            return RenderEngineFactory.createLiquid();
        }

        return RenderEngineFactory.createMustache();
    }
}
