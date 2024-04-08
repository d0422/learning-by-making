import { create } from 'zustand';

interface SchduleInfo {
  isScheduling: boolean;
  timer: NodeJS.Timeout | undefined;
  setIsSchduling: (value: boolean) => void;
  setTimer: (value: NodeJS.Timeout) => void;
}

export const useScheduleInfo = create<SchduleInfo>((set) => ({
  isScheduling: false,
  timer: undefined,
  setIsSchduling: (value: boolean) => {
    set((state) => {
      return {
        ...state,
        isScheduling: value,
      };
    });
  },
  setTimer: (value: NodeJS.Timeout) => {
    set((state) => ({
      ...state,
      timer: value,
    }));
  },
}));
