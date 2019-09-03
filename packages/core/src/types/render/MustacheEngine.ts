import Mustache from "terun-mustache";
import { IRenderEngine } from "../interfaces/IRenderEngine";

export class MustacheEngine implements IRenderEngine {
  public readonly engine: MustacheStatic = Mustache;

  public render(template: string, args: object) {
    return this.engine.render(template, args);
  }
}
