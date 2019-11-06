module.exports = {
    commands: {
        example: {
            transports: [{
                from: 'simple.terun',
                to: 'simple_to.txt',
                args: ["arg1"],
                done: (context) => {
                    const reference = context.reference("to-add-1");
                    reference.add(`Hello world`)

                    const reference2 = context.reference("to-add-2");
                    reference2.add(`Hello world 2`)
                }
            }]
        }
    }
};