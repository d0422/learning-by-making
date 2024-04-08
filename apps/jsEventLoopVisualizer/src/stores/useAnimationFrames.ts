import { TaskType } from '@/type';
import { create } from 'zustand';

interface AnimationFrames {
  animationFrames: TaskType[];
  inqueueAnimationFrames: (value: TaskType) => void;
  dequeueAnimationFrames: () => TaskType;
  reset: () => void;
}

export const useAnimationFrames = create<AnimationFrames>((set) => ({
  animationFrames: [],
  inqueueAnimationFrames: (value: TaskType) => {
    set((state) => ({
      ...state,
      animationFrames: [...state.animationFrames, value],
    }));
  },
  dequeueAnimationFrames: () => {
    let task: TaskType;
    set((state) => {
      task = state.animationFrames.shift()!;
      return {
        ...state,
        animationFrames: [...state.animationFrames],
      };
    });
    return task!;
  },
  reset: () => {
    set((state) => ({
      ...state,
      animationFrames: [],
    }));
  },
}));
