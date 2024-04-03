import { create } from 'zustand';
import { Queue } from '@repo/utils';

interface JobQueue {
  microTask: Queue<string>;
  macroTask: Queue<string>;
  animationFrames: Queue<string>;
  callStack: string[];
  addMicroTask: (value: string) => void;
  addMacroTask: (value: string) => void;
  addAnimationFrames: (value: string) => void;
  getNextJob: () => string;
  popCallStack: () => void;
}

export const useJobQueue = create<JobQueue>((set) => ({
  microTask: new Queue<string>(),
  macroTask: new Queue<string>(),
  animationFrames: new Queue<string>(),
  callStack: [],

  getNextJob: () => {
    let nextJob: string;
    set((state) => {
      if (!state.microTask.isEmpty()) {
        nextJob = state.microTask.dequeue();
        return { ...state, callStack: [...state.callStack, nextJob] };
      }

      if (!state.animationFrames.isEmpty()) {
        nextJob = state.animationFrames.dequeue();
        return { ...state, callStack: [...state.callStack, nextJob] };
      }

      if (!state.macroTask.isEmpty()) {
        nextJob = state.macroTask.dequeue();
        return { ...state, callStack: [...state.callStack, nextJob] };
      }
      return { ...state };
    });
    return nextJob!;
  },

  popCallStack: () => {
    set((state) => {
      state.callStack.pop();
      return {
        ...state,
      };
    });
  },

  addMicroTask: (value: string) => {
    set((state) => ({
      ...state,
      microTask: new Queue([...state.microTask.getQueueList(), value]),
    }));
  },

  addMacroTask: (value: string) => {
    set((state) => ({
      ...state,
      macroTask: new Queue([...state.macroTask.getQueueList(), value]),
    }));
  },

  addAnimationFrames: (value: string) => {
    set((state) => ({
      ...state,
      animationFrames: new Queue([
        ...state.animationFrames.getQueueList(),
        value,
      ]),
    }));
  },
}));
