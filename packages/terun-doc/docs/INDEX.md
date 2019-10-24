---
home: true
heroImage: /logo.svg
actionText: Get Started  →
actionLink: /docs/latest
features:
- title: Progressive
  details: Easy to start and use with existing code. Terun show your power with big architectures.
- title: Language Independent
  details: The language doesn't matter. Terun use templates to create new files.
- title: Alterable
  details: You can modify default behavior and create new plugins.
footer: Made with ❤ by people
---

### Template definition


Create your config file:

```javascript
const NotifyPlugin = require("@terun/plugin-notify");

module.exports = {
    engine: "mustache",
    commands: {
        example: {
            plugins: [
                new NotifyPlugin()
            ],
            transports: [
                {
                    from: 'from.terun',
                    to: 'to.html',
                    args: ["EntityName"],
                }
            ]
        }
    }
};
```

Define your template independente of language:

```javascript
class {{EntityName | capitalize}}Entity{
    constructor(){}
}
```

Run on terminal `terun --make example`:

```javascript
class PersonEntity{
    constructor(){}
}
```