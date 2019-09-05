import { IRenderEngine } from "../interfaces/IRenderEngine";
export default abstract class RenderEngineFactory {
    static createMustache(): IRenderEngine;
}
