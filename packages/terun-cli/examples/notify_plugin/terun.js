const NotifyPlugin = require('../../../terun-plugin-notify/lib/index');

module.exports = {
    commands: {
        example: {
            plugins: [
                new NotifyPlugin({
                    title: 'Ok!',
                    message: 'Uhul! Its done!',
                }),
            ],
            transports: [
                {
                    from: 'simple.terun',
                    to: 'simple_to.txt',
                    args: ['arg1'],
                },
            ],
        },
    },
};
