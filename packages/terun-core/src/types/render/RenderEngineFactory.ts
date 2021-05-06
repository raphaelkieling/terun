import { IRenderEngine } from "../interfaces/IRenderEngine";
import { MustacheEngine } from "./MustacheEngine";
import { LiquidEngine } from "./LiquidEngine";
import { EngineType } from "../interfaces/IConfig";

export default abstract class RenderEngineFactory {
  public static createMustache(): IRenderEngine {
    return new MustacheEngine();
  }

  public static createLiquid(): IRenderEngine {
    return new LiquidEngine();
  }

  public static make(type: EngineType): IRenderEngine {
    if (type === EngineType.MUSTACHE) {
      return RenderEngineFactory.createMustache();
    } else if (type === EngineType.LIQUID) {
      return RenderEngineFactory.createLiquid();
    } else {
      return RenderEngineFactory.createMustache();
    }
  }
}
