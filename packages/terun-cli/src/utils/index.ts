import chalk from "chalk";
import * as pack from "../../package.json";

export function getCurrentFolderPath() {
  return process.cwd();
}

export function printLogo(): Promise<void> {
  return new Promise(resolve => {
    console.log(
      chalk.green(`
 _                   
| |                       
| |_ ___ _ __ _   _ _ __  
| __/ _ \\ '__| | | | '_ \\ 
| ||  __/ |  | |_| | | | |
 \\__\\___|_|   \\__,_|_| |_|\n
Version: ${pack.version}     
--------------------------------------          
       `)
    );
    resolve();
  });
}
