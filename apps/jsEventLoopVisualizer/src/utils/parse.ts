import * as acorn from 'acorn';

export const parse = (code: string) => {
  const parseResult = acorn.parse(code, { ecmaVersion: 'latest' });

  const expressionCodes = parseResult.body.filter(
    (data) => data.type === 'ExpressionStatement'
  ) as acorn.ExpressionStatement[];

  const functionCodes = parseResult.body.filter(
    (data) => data.type === 'FunctionDeclaration'
  );

  const expressions = expressionCodes.map(
    (data) => data.expression
  ) as acorn.Expression[];

  const calleeExpression = expressions.filter(
    (data) => data.type === 'CallExpression'
  ) as acorn.CallExpression[];

  return {
    expression: calleeExpression,
    functionDeclare: functionCodes as acorn.FunctionDeclaration[],
  };
};
