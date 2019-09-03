import IConfigFile from "./types/interfaces/IConfigFile";
import IOptions from "./types/interfaces/IOptions";
import { IRenderEngine } from "./types/interfaces/IRenderEngine";
import { ITransport } from "./types/interfaces/ITransport";
import RenderFactory from "./types/render/RenderEngineFactory";

class Generator {
  private configFile: IConfigFile;
  private options: IOptions;
  private render: IRenderEngine;

  constructor(configFile: IConfigFile, options: IOptions) {
    this.configFile = configFile;
    this.options = options;
    this.render = RenderFactory.createMustache();
  }

  public run(transport: ITransport, source: any): string {
    const from = this.render.render(transport.from, source);
    const to = this.render.render(transport.from, source);
  }
}

export default Generator;
