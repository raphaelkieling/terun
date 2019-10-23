module.exports = {
    commands: {
        example: {
            plugins:[
                new terun.EntityPlugin()
            ],
            args: [
                "title",
                {
                    variable: "title2",
                    label: "Title 2"
                }
            ],
            transports: [
                {
                    from: 'from.terun',
                    to: 'to.html'
                }
            ]
        }
    }
};