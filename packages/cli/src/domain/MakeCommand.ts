import { Command } from "./Command";
import Core from "@terun/core";

export class MakeCommand extends Command{
    constructor(){
        super('make');
    }

    configure(){
        console.log('configurando')
    }

    execute(){

    }
}