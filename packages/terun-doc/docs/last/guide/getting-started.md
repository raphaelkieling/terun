---
sidebar: true
---
# Introduction

## Installation

* Install nodejs
* Install npm

Install with npm or yarn

```bash
npm i -g @terun/cli
```

```bash
yarn global add @terun/cli
```

## First template

Init the config file, usually create a folder called `terun` and run the command (inside the folder terun):

```sh
terun --init
```

```diff
   |_src
   |_package.json
++ |_terun
++ |_|_terun.js
```

If you open the `terun.js` and add 

```diff
module.exports = {
    commands: {
        example: {
            transports: [
                {
++                  from: "from.txt",
++                  to: "to.ex",
++                  args: ["MyCommand"]
                }
            ]
        }
    }
};
```

Create a file to generate. (You choice the language)

```elixir
# Using elixir language
defmodule {{MyCommand}}Module do
  def hello do
    IO.puts "Hello World with entity = {{MyCommand}}"
  end
end
```

Execute the command

```bash
terun --make example
```

Be happy.