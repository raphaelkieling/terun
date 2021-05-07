import chalk from "chalk";

export function getCurrentFolderPath() {
  return process.cwd();
}

export function printLogo(version: string): Promise<void> {
  return new Promise((resolve) => {
    console.log(
      chalk.green(`
  █████                                            
  ░░███                                             
  ███████    ██████  ████████  █████ ████ ████████  
░░░███░    ███░░███░░███░░███░░███ ░███ ░░███░░███ 
  ░███    ░███████  ░███ ░░░  ░███ ░███  ░███ ░███ 
  ░███ ███░███░░░   ░███      ░███ ░███  ░███ ░███ 
  ░░█████ ░░██████  █████     ░░████████ ████ █████
    ░░░░░   ░░░░░░  ░░░░░       ░░░░░░░░ ░░░░ ░░░░░ 

Version: ${version}     
--------------------------------------          
       `)
    );
    resolve();
  });
}
