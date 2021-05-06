# Pipelines

::: tip
We use the `underscore` library to build this helpers.
:::

The pipelines is a way to mutate the values inside the templates. But remember that you can use this inside the `from`, `to` in `transports`.

Example:

```diff
    {{myName | underscore | uppercase}}
++ //output: Random Name -> Random_Name -> RANDOM_NAME
```

The follow pipes is allowed:

| Name       | output                          |
| ---------- | ------------------------------- |
| uppercase  | `test -> TEST`                  |
| lowercase  | `TEST -> test`                  |
| underscore | `testExample -> teste_Example`  |
| capitalize | `test -> Test`                  |
| clearspace | `teste example -> testeexample` |
| firstlower | `Test -> test`                  |
| firstupper | `test -> Test`                  |
