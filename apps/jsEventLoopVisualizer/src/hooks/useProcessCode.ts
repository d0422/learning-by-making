import {
  CallExpression,
  ExpressionStatement,
  FunctionDeclaration,
  Identifier,
  MemberExpression,
} from 'acorn';
import { useAnimationFrames } from '../stores/useAnimationFrames';
import { useCallStack } from '../stores/useCallStack';
import { useFunction } from '../stores/useFunction';
import { useMacroQueue } from '../stores/useMacroQueue';
import { useMicroQueue } from '../stores/useMicroQueue';
import { parse } from '@/utils/parse';
import { TaskType } from '@/type';

interface CalleeIdentifier extends CallExpression {
  callee: Identifier;
}

interface CalleeMember extends CallExpression {
  callee: MemberExpression;
}
export const useProcessCode = () => {
  const {
    dequeueCompileQueue,
    pushCallStack,
    inqueueCompileQueue,
    insertCompileQueueHead,
  } = useCallStack();
  const { inqueueMacroTask } = useMacroQueue();
  const { inqueueMicroTask } = useMicroQueue();
  const { inqueueAnimationFrames } = useAnimationFrames();
  const { functions, addFunction } = useFunction();

  const parseUserCode = (code: string) => {
    //최초 파싱부
    const { expression, functionDeclare } = parse(code);
    expression.forEach((express) => {
      const codeString = code.slice(express.start, express.end);
      inqueueCompileQueue({
        code: codeString,
        expression: express,
        executed: false,
      });
    });
    functionDeclare.forEach((declare) => {
      const codeString = code.slice(declare.start, declare.end);
      addFunction(declare.id.name, codeString);
    });
  };

  const processFunctionDeclaration = (expression: FunctionDeclaration) => {
    const functionBody = expression.body.body;
    const realCode = functions[expression.id.name]!;
    const expressStatements = functionBody.filter(
      (data) => data.type === 'ExpressionStatement'
    ) as ExpressionStatement[];
    const expressions = expressStatements.map(
      (express: ExpressionStatement) => ({
        code: realCode.slice(express.start, express.end),
        expression: express.expression,
        executed: false,
        calleeName: expression.id.name,
      })
    );

    insertCompileQueueHead(expressions);
    return pushCallStack(dequeueCompileQueue());
  };

  const processCallExpression = (
    expression: CallExpression,
    callee?: string
  ) => {
    if (expression.callee.type === 'Identifier')
      processCalleeIdentifier(expression as CalleeIdentifier, callee);
    if (expression.callee.type === 'MemberExpression')
      processCalleeMemberExpression(expression as CalleeMember);
  };

  const processCalleeIdentifier = (
    expression: CalleeIdentifier,
    callee?: string
  ) => {
    // 사용자 정의 함수인 경우 해당 함수의 정의를 compileQueue에 더한다.
    // 이때 중첩적으로 함수 context가 더해질 수 있으므로 callee를 저장한다.
    const functionBody = functions[expression.callee.name];
    if (functionBody) {
      const { functionDeclare } = parse(functionBody);
      return insertCompileQueueHead({
        code: expression.callee.name,
        expression: functionDeclare[0]!,
        executed: false,
        calleeName: callee,
      });
    }
    const callbackTask = getCallbackTask(expression);
    if (expression.callee.type === 'Identifier' && callbackTask) {
      if (expression.callee.name === 'setTimeout')
        inqueueMacroTask(callbackTask);
      if (expression.callee.name === 'requestAnimationFrame')
        inqueueAnimationFrames(callbackTask);
    }
  };

  const processCalleeMemberExpression = (expression: CalleeMember) => {
    if (
      expression.callee.property.type === 'Identifier' &&
      expression.callee.property.name === 'then'
    ) {
      //Promise Then 콜백 처리
      const callbackTask = getCallbackTask(expression);
      if (callbackTask) inqueueMicroTask(callbackTask);
    }
  };

  const getCallbackTask = (expression: CallExpression) => {
    const argument = expression.arguments[0]!;
    if (argument.type === 'Identifier') {
      const codes = functions[argument.name]!;
      const { functionDeclare } = parse(codes);
      const name = functionDeclare[0]!.id.name;

      const result: TaskType = {
        code: name,
        expression: functionDeclare[0]!,
        executed: false,
      };

      return result;
    }
    if (argument.type === 'ArrowFunctionExpression') {
      // const result: TaskType = {
      //   expression: argument,
      //   executed: false,
      // };
      // return result;
    }
  };
  return {
    processFunctionDeclaration,
    processCallExpression,
    parseUserCode,
  };
};
