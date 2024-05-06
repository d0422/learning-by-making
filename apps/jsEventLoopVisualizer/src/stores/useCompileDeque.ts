import { TaskType } from '@/type';
import { create } from 'zustand';

interface CompileDeque {
  compileQueue: TaskType[];
  inqueueCompileQueue: (value: TaskType | TaskType[]) => void;
  dequeueCompileQueue: () => TaskType;
  insertCompileQueueHead: (value: TaskType | TaskType[]) => void;
  reset: () => void;
}

export const useCompileQueue = create<CompileDeque>((set) => ({
  compileQueue: [],
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

  reset: () => {
    set((state) => ({
      ...state,
      compileQueue: [],
    }));
  },
}));
