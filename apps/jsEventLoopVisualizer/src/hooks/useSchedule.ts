import { useJobQueue } from './useJobQueue';

let timer: NodeJS.Timeout;
export const useSchedule = (second?: number) => {
  const getNextJob = useJobQueue((state) => state.getNextJob);
  const popCallStack = useJobQueue((state) => state.popCallStack);

  const startSchedule = () => {
    let didPopCallStack = true;
    timer = setInterval(
      () => {
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

  return { startSchedule, stopSchedule };
};
