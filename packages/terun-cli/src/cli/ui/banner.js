"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBanner = void 0;
function getBanner(version) {
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
exports.getBanner = getBanner;
