module.exports = {
    commands: {
        example: {
            transports: [{
                from: 'simple.terun',
                to: 'simple_to.txt',
                args: ["arg1"],
            }]
        }
    }
};