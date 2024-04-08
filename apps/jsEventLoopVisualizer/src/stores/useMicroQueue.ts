import { TaskType } from '@/type';
import { create } from 'zustand';

interface MicroQueue {
  microTask: TaskType[];
  inqueueMicroTask: (value: TaskType) => void;
  dequeueMicroTask: () => TaskType;
  reset: () => void;
}

export const useMicroQueue = create<MicroQueue>((set) => ({
  microTask: [],
  inqueueMicroTask: (value: TaskType) => {
    set((state) => ({
      ...state,
      microTask: [...state.microTask, value],
    }));
  },
  dequeueMicroTask: () => {
    let task: TaskType;
    set((state) => {
      task = state.microTask.shift()!;
      return {
        ...state,
        microTask: [...state.microTask],
      };
    });
    return task!;
  },
  reset: () => {
    set((state) => ({
      ...state,
      microTask: [],
    }));
  },
}));
