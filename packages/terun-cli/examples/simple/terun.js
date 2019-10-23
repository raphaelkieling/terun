const EntityPlugin = require('../../../terun-plugin-entity/dist/index').default;
const NotifyPlugin = require('../../../terun-plugin-notify/dist/index').default;

module.exports = {
    commands: {
        example: {
            plugins: [
                new NotifyPlugin(),
                new EntityPlugin()
            ],
            args: ["title"],
            transports: [
                {
                    from: 'from.terun',
                    to: 'to.html'
                }
            ]
        }
    }
};