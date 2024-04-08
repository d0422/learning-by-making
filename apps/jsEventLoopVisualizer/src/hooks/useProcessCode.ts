import {
  CallExpression,
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
  const { dequeueCompileQueue, pushCallStack, inqueueCompileQueue } =
    useCallStack();
  const { inqueueMacroTask } = useMacroQueue();
  const { inqueueMicroTask } = useMicroQueue();
  const { inqueueAnimationFrames } = useAnimationFrames();
  const { functions } = useFunction();

  const processFunctionDeclaration = (expression: FunctionDeclaration) => {
    const functionBody = expression.body.body;
    const realCode = functions[expression.id.name]!;
    const expressions = functionBody
      .filter((data) => data.type === 'ExpressionStatement')
      .map((express) => ({
        code: realCode.slice(express.start, express.end),
        expression: express as any,
        executed: false,
      }));
    inqueueCompileQueue(expressions);
    return pushCallStack(dequeueCompileQueue());
  };

  const processCallExpression = (expression: CallExpression) => {
    if (expression.callee.type === 'Identifier')
      processCalleeIdentifier(expression as CalleeIdentifier);
    if (expression.callee.type === 'MemberExpression')
      processCalleeMemberExpression(expression as CalleeMember);
  };

  const processCalleeIdentifier = (expression: CalleeIdentifier) => {
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
  return { processFunctionDeclaration, processCallExpression };
};
