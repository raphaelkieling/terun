import { Lexer } from './Lexer';

let tokens = Lexer(`
<html>
    <body>
        {{test-arg}}

        {{?verify}}

        {{/verify}}
    </body>
</html>
`)
console.log(tokens)
