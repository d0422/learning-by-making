import { TaskType } from '@/type';
import {
  CallExpression,
  FunctionDeclaration,
  Identifier,
  MemberExpression,
} from 'acorn';
import { parse } from './parse';
type inqueueFunciton = (value: TaskType) => void;

interface CalleeIdentifier extends CallExpression {
  callee: Identifier;
}

interface CalleeMember extends CallExpression {
  callee: MemberExpression;
}

export class Scheduler {
  currentTask: TaskType;
  inqueueMacroTask: inqueueFunciton;
  inqueueAnimationFrames: inqueueFunciton;
  inqueueMicroTask: inqueueFunciton;
  inqueueCompileQueue: (value: TaskType | TaskType[]) => void;
  pushCallStack: (value: TaskType) => void;
  dequeueCompileQueue: () => TaskType;
  functions: Record<string, string>;

  constructor(
    currentTask: TaskType,
    inqueueMacroTask: inqueueFunciton,
    inqueueAnimationFrames: inqueueFunciton,
    inqueueMicroTask: inqueueFunciton,
    inqueueCompileQueue: (value: TaskType | TaskType[]) => void,
    pushCallStack: (value: TaskType) => void,
    dequeueCompileQueue: () => TaskType,
    functions: Record<string, string>
  ) {
    this.currentTask = currentTask;
    this.inqueueAnimationFrames = inqueueAnimationFrames;
    this.inqueueCompileQueue = inqueueCompileQueue;
    this.inqueueMacroTask = inqueueMacroTask;
    this.inqueueMicroTask = inqueueMicroTask;
    this.pushCallStack = pushCallStack;
    this.dequeueCompileQueue = dequeueCompileQueue;
    this.functions = functions;
  }

  processFunctionDeclaration(expression: FunctionDeclaration) {
    const { code: functionName } = this.currentTask;
    const functionBody = expression.body.body;
    const realCode = this.functions[functionName]!;
    const expressions = functionBody
      .filter((data) => data.type === 'ExpressionStatement')
      .map((express) => ({
        code: realCode.slice(express.start, express.end),
        expression: express as any,
        executed: false,
      }));
    this.inqueueCompileQueue(expressions);
    return this.pushCallStack(this.dequeueCompileQueue());
  }

  processCallExpression(expression: CallExpression) {
    if (expression.callee.type === 'Identifier')
      this.processCalleeIdentifier(expression as CalleeIdentifier);
    if (expression.callee.type === 'MemberExpression')
      this.processCalleeMemberExpression(expression as CalleeMember);
  }

  processCalleeIdentifier(expression: CalleeIdentifier) {
    const callbackTask = this.getCallbackTask(expression);
    if (expression.callee.type === 'Identifier' && callbackTask) {
      if (expression.callee.name === 'setTimeout')
        this.inqueueMacroTask(callbackTask);
      if (expression.callee.name === 'requestAnimationFrame')
        this.inqueueAnimationFrames(callbackTask);
    }
  }

  processCalleeMemberExpression(expression: CalleeMember) {
    if (
      expression.callee.property.type === 'Identifier' &&
      expression.callee.property.name === 'then'
    ) {
      //Promise Then 콜백 처리
      const callbackTask = this.getCallbackTask(expression);
      if (callbackTask) this.inqueueMicroTask(callbackTask);
    }
  }

  getCallbackTask(expression: CallExpression) {
    if (expression.arguments[0]!.type === 'Identifier') {
      const functionName = expression.arguments[0]!;
      const codes = this.functions[functionName.name]!;
      const { functionDeclare } = parse(codes);
      const name = functionDeclare[0]!.id.name;

      const result: TaskType = {
        code: name,
        expression: functionDeclare[0]!,
        executed: false,
      };

      return result;
    }
  }
}
