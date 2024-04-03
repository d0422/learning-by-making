import { useState } from 'react';
import { useJobQueue } from './useJobQueue';

let timer: NodeJS.Timeout;
export const useSchedule = (second?: number) => {
  const [isScheduling, setScheduling] = useState(false);
  const { getNextJob, popCallStack, isEnd } = useJobQueue();

  const startSchedule = () => {
    setScheduling(true);
    let didPopCallStack = true;
    timer = setInterval(
      () => {
        if (isEnd()) {
          setScheduling(false);
          clearInterval(timer);
          return;
        }

        if (didPopCallStack) {
          getNextJob();
          didPopCallStack = false;
        } else {
          popCallStack();
          didPopCallStack = true;
        }
      },
      second ? second * 1000 : 1000
    );
  };

  const stopSchedule = () => {
    if (timer) clearInterval(timer);
  };

  return { startSchedule, stopSchedule, isScheduling };
};
