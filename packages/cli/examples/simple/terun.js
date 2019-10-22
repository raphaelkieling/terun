module.exports = {
    commands: {
        example: {
            args: [
                "title", 
                {
                    variable: "legal",
                    label: "meu deus"
                }
            ],
            transports: [
                {
                    from: 'from.terun',
                    to: 'to3.html'
                }
            ]
        }
    }
};