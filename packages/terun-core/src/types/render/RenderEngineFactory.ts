import { IRenderEngine } from "../interfaces/IRenderEngine";
import { MustacheEngine } from "./MustacheEngine";
import { LiquidEngine } from './LiquidEngine';
import { EngineConfigOption } from '../interfaces/IConfig';

export default abstract class RenderEngineFactory {
  public static createMustache(): IRenderEngine {
    return new MustacheEngine();
  }

  public static createLiquid(): IRenderEngine {
    return new LiquidEngine();
  }

  public static make(type: EngineConfigOption): IRenderEngine {
    if (type === "mustache") {
      return RenderEngineFactory.createMustache();
    } else if (type === "liquid") {
      return RenderEngineFactory.createLiquid();
    } else {
      return RenderEngineFactory.createMustache();
    }
  }
}
