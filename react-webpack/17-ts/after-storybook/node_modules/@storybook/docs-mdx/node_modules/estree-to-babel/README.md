# Estree-to-babel [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/estree-to-babel.svg?style=flat&longCache=true
[BuildStatusURL]: https://github.com/coderaiser/estree-to-babel/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/estree-to-babel/workflows/Node%20CI/badge.svg
[NPMURL]: https://npmjs.org/package/estree-to-babel "npm"
[BuildStatusURL]: https://travis-ci.org/coderaiser/estree-to-babel "Build Status"
[CoverageURL]: https://coveralls.io/github/coderaiser/estree-to-babel?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/estree-to-babel/badge.svg?branch=master&service=github

Convert [`ESTree`](https://github.com/estree/estree)-compatible `JavaScript AST` to [`Babel AST`](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md).

To use parsers like:

- [`acorn`](https://github.com/acornjs/acorn)
- [`cherow`](https://github.com/cherow/cherow)
- [`espree`](https://github.com/eslint/espree)
- etc...

With `babel` tools like:

- [`@babel/traverse`](https://babeljs.io/docs/en/babel-traverse)
- [`@babel/types`](https://babeljs.io/docs/en/babel-types)
- etc...

The thing is [`@babel/parser`](https://babeljs.io/docs/en/babel-parser) has a [little differences](https://babeljs.io/docs/en/babel-parser#output) with `estree` standard:

- `Property` of `ObjectExpression` and `ObjectPattern` called `ObjectProperty`;
- `FunctionExpression` of a `Property` located in `ObjectMethod` node;
- `File` node;
- `StringLiteral`, `NumericLiteral`, `NullLiteral`, `RegExpLiteral`, `BooleanLiteral` instead of `Literal`;
- `ClassMethod` instead of `MethodDefinition`;
- `ClassPrivateMethod`;
- `ClassPrivateName` stores name as `Identifier` in `id` field;
- `ClassPrivateProperty` instead of `FieldDefinition`;
- `CallExpression` instead of `ImportExpression`;
- `OptionalMemberExpression` and `OptionalCallExpression` instead of `ChainExpression`;
- `ImportDeclaration` and `ExportNamedDeclaration` has `assertions`;
- etc...

Also [`@babel/parser`](https://babeljs.io/docs/en/babel-parser) has differences with [`typescript-estree`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/typescript-estree):

- `TSExpressionWithTypeArguments` instead of `TSClassImplements`;
- `ClassPrivateProperty` instead of `PropertyDefinition` when `key.type=PrivateName`;
- `ClasseProperty` instead of `PropertyDefinition` when `key.type=Identifier`;
- `PrivateName` instead of `PrivateIdentifier`;
- `TSInterfaceHeritage` instead of `TSExpressionWithTypeArguments`;
- `TSQualifiedName` instead of `MemberExpression`  in `TSInterfaceHeritage`;
- `TSDeclaredMethod` with `abstract=true` instead of `TSAbstractMethodDefinition`;
- etc...

`estree-to-babel` aims to smooth this differences.

## Install

```
npm i estree-to-babel
```

### Example

```js
const cherow = require('cherow');
const toBabel = require('estree-to-babel');
const traverse = require('@babel/traverse').default;

const ast = toBabel(cherow.parse(`
    const f = ({a}) => a;
`));

traverse({
    ObjectProperty(path) {
        console.log(path.value.name);
        // output
        'a';
    },
});
```

## License

MIT
