# Entity

Entity Plugin is used to create files based in a definition that you do.

## Install

```sh
npm install -D @terun/plugin-entity
```

## Config

Params:

| variable   | type     |
| ---------- | -------- |
| dictionary | `object` |

```js
// terun.js
const EntityPlugin = require("@terun/plugin-entity")

new EntityPlugins({
    dictionary:{}
})
// ... your terun configname
type
```

## Data on templates

| variable | type     | description                                               |
| -------- | -------- | --------------------------------------------------------- |
| entity   | `string` | The entity name                                           |
| fields   | `array`  | A array with `{ name:"name", type:"string", last: true }` |

```js
// MyTemplate.txt

class {{entity}}{
    {{#fields}}
    public {{name}}:{{type | captalize}};
    {{/fields}}
}
```

to:

```js
class Person{
    public name: String;
}
```

## Dictionary definition

If your language need different variable types you can define that. We have to select:

```txt
array
simple_array
json_array
object
boolean
integer
smallint
bigint
string
text
datetime
datetimetz
date
time
decimal
float
blob
guid
```

And you can override that with:

```js
//...

new EntityPlugin({
    dictionary:{
        float:'Number'
    }
})
//...
```