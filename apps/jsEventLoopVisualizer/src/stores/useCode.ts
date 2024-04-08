import { create } from 'zustand';

interface Code {
  code: string;
  setCode: (value: string) => void;
}

export const useCode = create<Code>((set) => ({
  code: `function c(){
    b();
    console.log("test");
  }
  c();
  function b(){
    console.log(123);
    Promise.resolve().then(bar);
  }
  function foo(){
    console.log("microTask");
    b();
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
