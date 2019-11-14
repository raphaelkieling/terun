---
sidebar: true
---

# What fuck is Terun

Terun is a cli command to generate code for your project. It's use templates to do that.

Template is a file with your code that you wanna generate. Like that:

```js
function {{myFunctionName}}(){
    return true;
}
```

Terun can read that and transport the file to your destination. Asking the value for the each argument.

## Why?

Ok, you must be wondering why you need that if you can use a lot of other tools. The problem that i see is that the other tools have a bit of life time inside your project because your project increase a lot, with a big architecture and files to create a simple thing.

Terun was created to create what YOUR project need, without abstractions, grammars to be hard to use or default templates that you need cut a lot of code blocks to use.