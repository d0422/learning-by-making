import { create } from 'zustand';

interface Code {
  code: string;
  setCode: (value: string) => void;
}

export const useCode = create<Code>((set) => ({
  code: `
    function foo(){
      console.log("microTask");
    }
    
    function bar(){
      console.log("macroTask");
    }
  
    function animation(){
      console.log("animation");
    }
  
    setTimeout(bar,0);
    Promise.resolve().then(foo);
    requestAnimationFrame(animation);
    `,

  setCode: (value: string) => {
    set((state) => ({
      ...state,
      code: value,
    }));
  },
}));
