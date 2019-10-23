import { IRenderEngine } from "../interfaces/IRenderEngine";
import { MustacheEngine } from "./MustacheEngine";

export default abstract class RenderEngineFactory {
  public static createMustache(): IRenderEngine {
    return new MustacheEngine();
  }
}
