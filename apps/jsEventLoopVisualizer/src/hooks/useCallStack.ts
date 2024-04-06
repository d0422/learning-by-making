import { TaskType } from '@/type';
import { create } from 'zustand';

interface CallStack {
  callStack: TaskType[];
  compileQueue: TaskType[];
  pushCallStack: (value: TaskType) => void;
  popCallStack: () => void;
  inqueueCompileQueue: (value: TaskType | TaskType[]) => void;
  dequeueCompileQueue: () => TaskType;
}

export const useCallStack = create<CallStack>((set) => ({
  callStack: [],
  compileQueue: [],

  pushCallStack: (value: TaskType) => {
    set((state) => {
      return {
        ...state,
        callStack: [...state.callStack, value],
      };
    });
  },

  inqueueCompileQueue: (value: TaskType | TaskType[]) => {
    set((state) => {
      if (Array.isArray(value))
        return {
          ...state,
          compileQueue: [...state.compileQueue, ...value],
        };

      return {
        ...state,
        compileQueue: [...state.compileQueue, value],
      };
    });
  },

  dequeueCompileQueue: () => {
    let task: TaskType;
    set((state) => {
      task = state.compileQueue.shift()!;
      return {
        ...state,
        compileQueue: [...state.compileQueue],
      };
    });
    return task!;
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
}));
