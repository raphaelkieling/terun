import { notify } from "node-notifier";
import IPlugin from "@terun/cli/core/interfaces/IPlugin";
import {IGeneratorHook} from "@terun/cli/core/interfaces";

type NotifyPluginParams = {
  title?: string;
  message?: string;
};

class NotifyPlugin implements IPlugin {
  name: string = "Notify";
  options: NotifyPluginParams;

  constructor(params?: NotifyPluginParams) {
    this.options = Object.assign(
      {
        title: "Terun done",
        message: "It's done with success"
      },
      params
    );
  }

  install(hooks: IGeneratorHook) {
    hooks.done.tap("NotifyPlugin", () => {
      notify({
        title: this.options.title,
        message: this.options.message
      });
    });
  }
}

export = NotifyPlugin;
