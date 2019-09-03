import Core from "@terun/core";
import yargs from "yargs";
import rc from "rc";

const argv = yargs.argv;

const conf = rc("terun", { basePath: "" });

console.log(conf)