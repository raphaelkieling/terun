import { createPromp } from '@terun/cli/dist/utils/prompts';
import { IPlugin } from '@terun/core/dist/types/interfaces';
import { RenderData, ConfigureParams } from '@terun/core/dist/types/interfaces/IPlugin';
import { OnTransportParams, BeforeRenderParams } from '@terun/core/src/types/interfaces/IPlugin';

type EntityPluginOptions = {
    basePath: string;
}

class EntityPlugin implements IPlugin {
    name: string = 'Entity Resolver';
    options: EntityPluginOptions;
    fieldTypes: string[] = ['array', 'simple_array', 'json_array', 'object', 'boolean', 'integer', 'smallint', 'bigint', 'string', 'text', 'datetime', 'datetimetz', 'date', 'time', 'decimal', 'float', 'blob', 'guid'];


    constructor(params: EntityPluginOptions) {
        this.options = params;
    }

    async makeQuestions() {
        let data = {};
        let lastFieldName = null;
        const fields = [];

        const { entity_name } = await createPromp({
            type: "text",
            message: "The entity shortcut name",
            name: "entity_name"
        });

        do {
            const { field_name } = await createPromp({
                type: "text",
                message: "New field name (blank to stop)",
                name: "field_name"
            });

            lastFieldName = field_name;

            if (!lastFieldName) break;

            const { field_type } = await createPromp({
                type: "autocomplete",
                message: "Field type [default string]",
                name: "field_type",
                initial: "string",
                choices: [
                    ...this.fieldTypes.map((el, index) => ({ title: el, value: el }))
                ]
            });

            fields.push({
                
            })
        } while (lastFieldName != null || lastFieldName == '');

        return data;
    }

    async configure(params: ConfigureParams): Promise<void> {

    }

    async beforeRender({ localArgs }: BeforeRenderParams): Promise<RenderData> {
        await this.makeQuestions();
        return localArgs;
    }
}

export = EntityPlugin;