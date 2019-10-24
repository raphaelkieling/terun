const EntityPlugin = require('../../../terun-plugin-entity/dist/index');
const NotifyPlugin = require('../../../terun-plugin-notify/dist/index');

module.exports = {
    engine: "liquid",
    commands: {
        example: {
            plugins: [
                new NotifyPlugin(),
                new EntityPlugin()
            ],
            transports: [
                {
                    from: 'from.terun',
                    to: 'to.html',
                    args: ["title"],
                }
            ]
        }
    }
};