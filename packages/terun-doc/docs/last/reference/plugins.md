# Plugin

Plugin are a way to extend function around the terun core. It use hooks to apply your logic and add info on source berfore render a file for example.

## Using your first plugin

It's simple

```js
// remember that you need install the package
const EntityPlugin = require("@terun/plugin-entity")

module.exports = {
    commands:{
        example:{
            plugins:[
                new EntityPlugin()
            ],
            ...
        }
    }
}
```

## Write your fist plugin

```js
class MyPlugin{
    constructor(){
        this.name = "MyPlugin"
    }

    install(hooks){
        hooks.done.tap("",()=>{
            console.log("Make anythink")
        })
    }
}

// And use on
module.exports = {
    ...
    plugins:[
        new MyPlugin(),
        // you also can do that
        {
            name:"hi",
            install(hooks){
                console.log("Other plugin")
            }
        }
    ],
    ...
}
```