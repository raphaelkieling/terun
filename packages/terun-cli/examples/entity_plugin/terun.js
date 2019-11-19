const EntityPlugin = require('../../../terun-plugin-entity/lib/index');

module.exports = {
    commands: {
        example: {
            plugins: [
                new EntityPlugin({
                    hook: 'beforeRender'
                }),
            ],
            args: [{
                message: "Need save action?",
                name: "needSave",
                choices: [
                    { title: 'Yes!', value: true },
                    { title: 'No!', value: null }
                ]
            }],
            transports: [{
                validator: ({ args }) => args.needSave,
                from: 'classExample.terun',
                to: '{{entity}}.dart',
                args: [],
            }]
        }
    }
};