export function getBanner(version: string): string {
    return `
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
    `;
}
