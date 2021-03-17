import chalk from "chalk";
import * as pack from "../../package.json";

export function getCurrentFolderPath() {
  return process.cwd();
}

export function printLogo(): Promise<void> {
  return new Promise(resolve => {
    console.log(
      chalk.green(`
████████╗███████╗██████╗░██╗░░░██╗███╗░░██╗
╚══██╔══╝██╔════╝██╔══██╗██║░░░██║████╗░██║
░░░██║░░░█████╗░░██████╔╝██║░░░██║██╔██╗██║
░░░██║░░░██╔══╝░░██╔══██╗██║░░░██║██║╚████║
░░░██║░░░███████╗██║░░██║╚██████╔╝██║░╚███║
░░░╚═╝░░░╚══════╝╚═╝░░╚═╝░╚═════╝░╚═╝░░╚══╝
Version: ${pack.version}     
--------------------------------------          
       `)
    );
    resolve();
  });
}
