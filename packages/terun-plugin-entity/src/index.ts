import { createPromp } from "@terun/cli/lib/utils/prompts";
import { Log } from "@terun/cli/lib/cli/ui";
import IPlugin from "@terun/cli/lib/core/interfaces/IPlugin";
import { IGeneratorHook } from "@terun/cli/lib/core/interfaces/IGeneratorHook";

type EntityPluginOptions = {
  dictionary?: { [key: string]: string };
};

class EntityPlugin implements IPlugin {
  name: string = "Entity Resolver";
  options: EntityPluginOptions;
  fieldTypes: string[] = [
    "array",
    "simple_array",
    "json_array",
    "object",
    "boolean",
    "integer",
    "smallint",
    "bigint",
    "string",
    "text",
    "datetime",
    "datetimetz",
    "date",
    "time",
    "decimal",
    "float",
    "blob",
    "guid",
  ];

  constructor(params: EntityPluginOptions) {
    this.options = Object.assign(
      {},
      {
        dictionary: {},
      },
      params
    );
  }

  async makeQuestions() {
    let lastFieldName = null;
    const fields = [];

    Log.log("------------------------");

    const { entity_name } = await createPromp({
      type: "text",
      message: "The entity shortcut name",
      name: "entity_name",
    });

    do {
      Log.log("\n");

      const { field_name } = await createPromp({
        type: "text",
        message: "New field name (blank to stop)",
        name: "field_name",
      });

      lastFieldName = field_name;

      if (!lastFieldName) break;

      const { field_type } = await createPromp({
        type: "autocomplete",
        message: "Field type [default string]",
        name: "field_type",
        initial: "string",
        choices: this.fieldTypes.map((el) => ({ title: el, value: el })),
      });

      fields.push({
        name: field_name,
        type:
          (this.options.dictionary && this.options.dictionary[field_type]) ||
          field_type,
      });
    } while (lastFieldName != null || lastFieldName == "");

    return {
      fields: fields.map((field, i) => ({
        ...field,
        last: fields.length - 1 === i,
      })),
      entity: entity_name,
    };
  }

  install(hooks: IGeneratorHook) {
    hooks.global.tapPromise("EntityPlugin", async (source) => {
      return { ...(await this.makeQuestions()), ...source };
    });
  }
}

export = EntityPlugin;
