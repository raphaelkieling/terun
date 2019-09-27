enum TokenType {
    TEXT,
    NUMBER,
    WHITESPACE,
    INIT
}

import moo from 'moo';

const compiler = moo.compile({
    WS: /[ \t]+/,
    rparen: /\}\}/,
    lparen: /\{\{/,
    keyword: ['?','/'],
    number: /0|[1-9][0-9]*/,
    text: /[\<\>\\\/a-zA-Z\"\'\-]/,
    NL: { match: /\n/, lineBreaks: true },
})

export const Lexer = (input:string)=>{
    let tokens = [];
    compiler.reset(input);
    let finded = compiler.next();
    
    while(finded){
        tokens.push(finded);
        finded = compiler.next();
    }
    return tokens;
}