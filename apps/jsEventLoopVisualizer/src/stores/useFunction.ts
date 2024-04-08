import { create } from 'zustand';

interface IFunction {
  functions: Record<string, string>;
  addFunction: (name: string, body: string) => void;
}

export const useFunction = create<IFunction>((set) => ({
  functions: {},
  addFunction: (name: string, body: string) => {
    set((state) => {
      const newFunctions = { ...state.functions };
      newFunctions[name] = body;
      return { ...state, functions: newFunctions };
    });
  },
}));
