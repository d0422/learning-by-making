import { useEffect, useRef, useState } from 'react';
import { useFunction } from './useFunction';
import { useCallStack } from './useCallStack';
import { useMacroQueue } from './useMacroQueue';
import { useMicroQueue } from './useMicroQueue';
import { useAnimationFrames } from './useAnimationFrames';
import { Scheduler } from '@/utils/Schduler';

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
      const currentTask = callStack[stackLength - 1]!;
      const { expression, executed } = currentTask;

      if (executed) {
        if (compileQueue.length !== 0)
          return pushCallStack(dequeueCompileQueue());
        return popCallStack();
      }
      currentTask.executed = true;

      const scheduler = new Scheduler(
        currentTask,
        inqueueMacroTask,
        inqueueAnimationFrames,
        inqueueMicroTask,
        inqueueCompileQueue,
        pushCallStack,
        dequeueCompileQueue,
        functions
      );

      if (expression.type === 'FunctionDeclaration')
        return scheduler.processFunctionDeclaration(expression);
      if (expression.type === 'CallExpression')
        scheduler.processCallExpression(expression);

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
