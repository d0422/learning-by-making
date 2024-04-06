import { useEffect, useRef, useState } from 'react';
import { useFunction } from './useFunction';
import { parse } from '@/utils/parse';
import { useCallStack } from './useCallStack';
import { useMacroQueue } from './useMacroQueue';
import { useMicroQueue } from './useMicroQueue';
import { useAnimationFrames } from './useAnimationFrames';

export const useSchedule = (second?: number) => {
  const [isScheduling, setScheduling] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const { functions } = useFunction();
  const scheduleRef = useRef<() => void>();
  const {
    callStack,
    compileQueue,
    dequeueCompileQueue,
    popCallStack,
    pushCallStack,
    inqueueCompileQueue,
  } = useCallStack();
  const { inqueueMacroTask, dequeueMacroTask, macroTask } = useMacroQueue();
  const { inqueueMicroTask, dequeueMicroTask, microTask } = useMicroQueue();
  const { animationFrames, inqueueAnimationFrames, dequeueAnimationFrames } =
    useAnimationFrames();

  const isEnd = () => {
    const checkList = [
      microTask,
      macroTask,
      animationFrames,
      callStack,
      compileQueue,
    ];
    if (checkList.some((each) => each.length !== 0)) return false;
    return true;
  };

  useEffect(() => {
    scheduleRef.current = () => {
      if (isEnd()) {
        setScheduling(false);
        clearInterval(timer);
        return;
      }
      schedule();
    };
  });

  useEffect(() => {
    if (isScheduling) {
      const tick = () => scheduleRef.current && scheduleRef.current();

      setTimer(setInterval(tick, second ? second * 1000 : 1000));
      return () => clearInterval(timer);
    }
  }, [isScheduling]);

  const schedule = () => {
    const stackLength = callStack.length;
    if (stackLength !== 0) {
      const top = callStack[stackLength - 1]!;
      const { expression, code, executed } = top;
      if (executed) {
        if (compileQueue.length !== 0)
          return pushCallStack(dequeueCompileQueue());
        return popCallStack();
      }
      top.executed = true;

      if (expression.type === 'FunctionDeclaration') {
        const functionBody = expression.body.body;
        const realCode = functions[code]!;
        const expressions = functionBody
          .filter((data) => data.type === 'ExpressionStatement')
          .map((express) => ({
            code: realCode.slice(express.start, express.end),
            expression: express as any,
            executed: false,
          }));
        inqueueCompileQueue(expressions);
        return pushCallStack(dequeueCompileQueue());
      }
      if (expression.type === 'CallExpression') {
        if (expression.callee.type === 'Identifier') {
          if (expression.callee.name === 'setTimeout') {
            //setTimeout의 경우
            const callbackFunctionName = expression.arguments[0]!;
            if (callbackFunctionName.type === 'Identifier') {
              const codes = functions[callbackFunctionName.name];
              if (codes) {
                const { functionDeclare } = parse(codes);
                const name = functionDeclare[0]!.id.name;
                inqueueMacroTask({
                  code: name,
                  expression: functionDeclare[0]!,
                  executed: false,
                });
              }
            }
          }
          if (expression.callee.name === 'requestAnimationFrame') {
            const callback = expression.arguments[0]!;
            if (callback.type === 'Identifier') {
              const code = functions[callback.name]!;
              const { functionDeclare } = parse(code);
              inqueueAnimationFrames({
                code: callback.name,
                expression: functionDeclare[0]!,
                executed: false,
              });
            }
          }
        }

        if (expression.callee.type === 'MemberExpression') {
          if (
            expression.callee.property.type === 'Identifier' &&
            expression.callee.property.name === 'then'
          ) {
            //Promise Then 콜백 처리
            if (expression.arguments[0]!.type === 'Identifier') {
              const functionName = expression.arguments[0]!;
              const codes = functions[functionName.name];

              if (codes) {
                const { functionDeclare } = parse(codes);
                const name = functionDeclare[0]!.id.name;
                inqueueMicroTask({
                  code: name,
                  expression: functionDeclare[0]!,
                  executed: false,
                });
              }
            }
          }
        }
      }

      return popCallStack();
    }
    if (compileQueue.length !== 0) return pushCallStack(dequeueCompileQueue());

    if (microTask.length !== 0) return pushCallStack(dequeueMicroTask());
    if (animationFrames.length != 0)
      return pushCallStack(dequeueAnimationFrames());
    if (macroTask.length !== 0) return pushCallStack(dequeueMacroTask());
  };

  const startSchedule = () => {
    setScheduling(true);
  };

  const stopSchedule = () => {
    if (timer) clearInterval(timer);
  };

  return { startSchedule, stopSchedule, isScheduling, schedule };
};
