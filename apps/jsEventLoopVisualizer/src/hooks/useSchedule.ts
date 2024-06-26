import { useEffect, useRef } from 'react';
import { useCallStack } from '@stores/useCallStack';
import { useMacroQueue } from '@stores/useMacroQueue';
import { useMicroQueue } from '@stores/useMicroQueue';
import { useAnimationFrames } from '@stores/useAnimationFrames';
import { useProcessCode } from './useProcessCode';
import { useScheduleInfo } from '@/stores/useSchduleInfo';
import { useCompileQueue } from '@/stores/useCompileDeque';

export const useSchedule = (second?: number) => {
  const { timer, isScheduling, setIsSchduling, setTimer } = useScheduleInfo();
  const { processCallExpression, processFunctionDeclaration } =
    useProcessCode();
  const scheduleRef = useRef<() => void>();
  const {
    compileQueue,
    dequeueCompileQueue,
    reset: resetCompileQueue,
  } = useCompileQueue();
  const {
    callStack,

    popCallStack,
    pushCallStack,
    reset: resetCallStackAndJobs,
  } = useCallStack();
  const { dequeueMacroTask, macroTask, reset: resetMacro } = useMacroQueue();
  const { dequeueMicroTask, microTask, reset: resetMicro } = useMicroQueue();
  const {
    animationFrames,
    dequeueAnimationFrames,
    reset: resetAnimationFrames,
  } = useAnimationFrames();

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
        setIsSchduling(false);
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
      const { expression, executed, code } = currentTask;
      if (executed) {
        //함수 context가 쌓여있는 경우로,
        // compileQueue 앞단 작업의 calleeName과 함수 이름이 같은 경우 context 위에서 실행문을 실행한다
        if (compileQueue.length !== 0 && compileQueue[0]?.calleeName === code)
          return pushCallStack(dequeueCompileQueue());
        return popCallStack();
      }
      currentTask.executed = true;
      if (expression.type === 'FunctionDeclaration')
        //함수 정의가 stack에 쌓인 경우 함수정의를 pop하지 않고 위에 함수 실행문을 쌓는다.
        // 이를 통해 함수 context가 callStack에 쌓인다.
        return processFunctionDeclaration(expression);
      if (expression.type === 'CallExpression')
        processCallExpression(expression, currentTask.calleeName);

      return popCallStack();
    }
    if (compileQueue.length !== 0) return pushCallStack(dequeueCompileQueue());

    if (microTask.length !== 0) return pushCallStack(dequeueMicroTask());
    if (animationFrames.length != 0)
      return pushCallStack(dequeueAnimationFrames());
    if (macroTask.length !== 0) return pushCallStack(dequeueMacroTask());
  };

  const startSchedule = () => {
    setIsSchduling(true);
  };

  const stopSchedule = () => {
    if (timer) clearInterval(timer);
    setIsSchduling(false);
  };

  const reset = () => {
    resetCallStackAndJobs();
    resetAnimationFrames();
    resetMacro();
    resetMicro();
    resetCompileQueue();
  };

  return { startSchedule, stopSchedule, isScheduling, schedule, reset };
};
