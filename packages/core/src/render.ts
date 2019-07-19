import TerunMustache from "terun-mustache";

export default class Render {
  public engine: MustacheStatic = TerunMustache;

  public render(template: string, args: object) {
    return this.engine.render(template, args);
  }
}
