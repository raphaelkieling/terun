const EntityPlugin = require('../../../terun-plugin-entity/dist/index');
const NotifyPlugin = require('../../../terun-plugin-notify/dist/index');

const needSaveArg = {
    label: "Need save?",
    variable: "needSave",
    choices: [
        { title: 'Yes!', value: true },
        { title: 'No!', value: null }
    ]
};

module.exports = {
    engine: "liquid",
    commands: {
        example: {
            plugins: [
                new EntityPlugin(),
                new NotifyPlugin()
            ],
            transports: [{
                validator: ({ args }) => args.needSave,
                from: 'from.terun',
                to: 'to.html',
                args: [
                    needSaveArg,
                    "fileName"
                ],
            }]
        }
    }
};