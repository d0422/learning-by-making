import * as acorn from 'acorn';

export interface TaskType {
  code: string;
  expression: acorn.Expression | acorn.FunctionDeclaration;
  executed: boolean;
}
