type EffectCallbacks = {
  func: () => void;
  deps: any[];
  haveToCall: boolean;
};

const effectCallbackArray: EffectCallbacks[] = [];
let effectIndex = 0;

export const useEffect = (callback: () => void, deps: any[]) => {
  const indexBind = effectIndex; //effectIndex가 ++형태로 변경되므로 bind시켜주는 변수
  effectIndex++;
  if (effectCallbackArray[indexBind] === undefined) {
    effectCallbackArray.push({
      func: callback,
      deps,
      haveToCall: true,
    });
    return;
  }
  const isChange = deps.some(
    (deps, index) => effectCallbackArray[indexBind].deps[index] !== deps
  );
  if (isChange) {
    effectCallbackArray[indexBind].deps = deps;
    effectCallbackArray[indexBind].haveToCall = true;
  }
};

export const getEffectArray = () => effectCallbackArray;
export const initializeEffectIndex = () => (effectIndex = 0);
