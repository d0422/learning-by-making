import { TaskType } from '@/type';
import { create } from 'zustand';

interface CallStack {
  callStack: TaskType[];
  pushCallStack: (value: TaskType) => void;
  popCallStack: () => void;
  reset: () => void;
}

export const useCallStack = create<CallStack>((set) => ({
  callStack: [],

  pushCallStack: (value: TaskType) => {
    set((state) => {
      return {
        ...state,
        callStack: [...state.callStack, value],
      };
    });
  },

  popCallStack: () => {
    let task: TaskType;
    set((state) => {
      task = state.callStack.pop()!;
      return {
        ...state,
        callStack: [...state.callStack],
      };
    });
    return task!;
  },
  reset: () => {
    set((state) => ({
      ...state,
      callStack: [],
    }));
  },
}));
