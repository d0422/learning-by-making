import { TaskType } from '@/type';
import { create } from 'zustand';

interface CallStack {
  callStack: TaskType[];
  compileQueue: TaskType[];
  pushCallStack: (value: TaskType) => void;
  popCallStack: () => void;
  inqueueCompileQueue: (value: TaskType | TaskType[]) => void;
  dequeueCompileQueue: () => TaskType;
  insertCompileQueueHead: (value: TaskType | TaskType[]) => void;
  reset: () => void;
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
  insertCompileQueueHead: (value: TaskType | TaskType[]) => {
    set((state) => {
      if (Array.isArray(value))
        return {
          ...state,
          compileQueue: [...value, ...state.compileQueue],
        };

      return {
        ...state,
        compileQueue: [value, ...state.compileQueue],
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
  reset: () => {
    set((state) => ({
      ...state,
      callStack: [],
      compileQueue: [],
    }));
  },
}));
