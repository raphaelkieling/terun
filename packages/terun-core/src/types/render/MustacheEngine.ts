const Mustache = require("terun-mustache");
import { IRenderEngine } from "../interfaces/IRenderEngine";
import { defaultPipelines } from '../Pipeline';

export class MustacheEngine implements IRenderEngine {
  public readonly engine: any = Mustache;

  public async render(template: string, args: object) {
    args = Object.assign(args, defaultPipelines);
    return this.engine.render(template, args);
  }
}