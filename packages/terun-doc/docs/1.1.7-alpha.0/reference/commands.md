# Commands

Commands is a essencial part of Terun because it's the core of the concept. Responsable to define the transport files (take easy i will explain) and should add plugins to your command life cycle.

### Definition

| variable   | description                                                                               | optional | default    |
| ---------- | ----------------------------------------------------------------------------------------- | -------- | ---------- |
| plugins    | There is the place when i can call your plugin                                            | x        | `[]`       |
| args       | You can define a lot of questions to populate you source and create your file around that | x        | `[]`       |
| transports | Define how and where Terun create the files                                               |          | `[]`       |
| hook       | A possibility to intercept the life cycle functions                                       | x        | `()=>void` |

### Plugins

Used to extend the function of Terun. You can use it like this:

```js
const EntityPlugin = require("@terun/plugin-terun")

module.exports = {
    commands:{
        plugins:[
            new EntityPlugin()
        ],
        example:{
            ...
        }
    }
}
```

### Args

Is a good choice if you need dinamic options to do different things in your template. Have two form to use:

```js
module.exports = {
    commands:{
        example:{
            args:["something"],
            ...
        }
    }
}
```
This will create a text option, i cannot use that if you need a boolean for example. 

Or use defining the objects on the second option. We use the `prompts` you can see more [here](https://github.com/terkelg/prompts)

```js
module.exports = {
    commands:{
        example:{
            args:[
                {
                    type: 'text',
                    name: 'title',
                    message: 'The title'
                }
            ]
        }
    }
}
```

### Transports

That is the responsable to define what i gonna create and where i gonna create the files.

| variable  | description                                                         | options | default          |
| --------- | ------------------------------------------------------------------- | ------- | ---------------- |
| name      | Used to show while create a file                                    | x       | `''`             |
| debug     | If you need print the source before create the file                 | x       | `false`          |
| from      | Define where is your template                                       |         |                  |
| to        | Define where you will create your generated file                    |         |                  |
| validator | Used to create a validator for if would need create the file or not | x       | `(params)=>true` |

### Hook

Hook is a way to intercept the command life cycle, that is a advanced way to extend functions but if really need something better, create a plugin. But ok, i you want use that. We use the webpack library called `tapable` to create the plugin system,  you can see more [here](https://github.com/webpack/tapable);

```js
module.exports = {
    commands:{
        example:{
            hook:(hooks)=>{
                /**
                * `done` and `beforeRender` is one of life cycle name. 
                * I will explain about that later.
                */
                hooks.done.tap("something", () => {
                    console.log("The file done with success!");
                });

                hooks.beforeRender.tapPromise("something", async (source, transport, compiler) => {
                    source.title = 'I have two cakes to eat';
                    return source;
                });
            }
            ...
        }
    }
}
```