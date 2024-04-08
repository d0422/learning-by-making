import { TaskType } from '@/type';
import { create } from 'zustand';

interface MacroQueue {
  macroTask: TaskType[];
  inqueueMacroTask: (value: TaskType) => void;
  dequeueMacroTask: () => TaskType;
  reset: () => void;
}

export const useMacroQueue = create<MacroQueue>((set) => ({
  macroTask: [],
  inqueueMacroTask: (value: TaskType) => {
    set((state) => ({
      ...state,
      macroTask: [...state.macroTask, value],
    }));
  },
  dequeueMacroTask: () => {
    let task: TaskType;
    set((state) => {
      task = state.macroTask.shift()!;
      return {
        ...state,
        macroTask: [...state.macroTask],
      };
    });
    return task!;
  },
  reset: () => {
    set((state) => ({ ...state, macroTask: [] }));
  },
}));
