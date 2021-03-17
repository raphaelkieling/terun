
<div align="center">
    <img src="packages/terun-doc/docs/.vuepress/public/logo.svg" height="150">
    <h1>Terun</h1>
</div>


[![Netlify Status](https://api.netlify.com/api/v1/badges/ca5d79ef-8e9e-4325-a357-27f180eff7c1/deploy-status)](https://app.netlify.com/sites/loving-nobel-792891/deploys)

Terun is a template generator to any purpose. Create code from template files and reduces the difficult to increase the project with big architecture.

```txt
yarn global @terun/cli
```

# Getting start

Create your config file:

```javascript
module.exports = {
    commands: {
        example: {
            args:["EntityName"],
            transports: [
                {
                    from: 'from.terun',
                    to: 'to.html'
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

# Documentation

Here: https://terun.netlify.com/
