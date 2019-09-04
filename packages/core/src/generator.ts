import * as path from "path";
import IConfigFile from "./types/interfaces/IConfigFile";
import IOptions from "./types/interfaces/IOptions";
import { IRenderEngine } from "./types/interfaces/IRenderEngine";
import { ITransport } from "./types/interfaces/ITransport";
import RenderFactory from "./types/render/RenderEngineFactory";
import { getUtf8File, writeUtf8File } from "./utils/file";

class Generator {
  private configFile: IConfigFile;
  private options: IOptions;
  private render: IRenderEngine;

  constructor(configFile: IConfigFile, options: IOptions) {
    this.configFile = configFile;
    this.options = options;
    this.render = RenderFactory.createMustache();
  }

  public initTransport({ transport, source }: {
    transport: ITransport;
    source: any;
  }): void {
    const { basePath } = this.configFile;
    const pathFrom = path.join(basePath, this.render.render(transport.from, source));
    const pathTo = path.join(basePath, this.render.render(transport.to, source));

    const fromContentFile: string = getUtf8File(pathFrom);
    const fromContentRendered: string = this.render.render(fromContentFile, source);

    writeUtf8File(pathTo, fromContentRendered);
  }
}

export default Generator;
