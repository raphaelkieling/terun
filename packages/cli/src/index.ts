import Core from "@terun/core";
import yargs from "yargs";

const argv = yargs.argv;

if (argv.version) {
  new Core(
    {
      baseUrl: "",
      commands: []
    },
    null
  );
}
