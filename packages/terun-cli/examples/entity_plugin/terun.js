const EntityPlugin = require('../../../terun-plugin-entity/dist/index');

module.exports = {
    commands: {
        example: {
            plugins: [
                new EntityPlugin(),
            ],
            args: [{
                label: "Need save action?",
                variable: "needSave",
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