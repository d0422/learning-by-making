import App from '../pages';
import { makeDOM } from './createDOM';
import { updateDOM } from './updateDOM';
import { initializeIndex } from './useState';
import { MiniReactNode } from './jsx-runtime';
import { getEffectArray, initializeEffectIndex } from './useEffect';

let prev: MiniReactNode; //이전의 virtual DOM
let root: Element; //최상단 root요소

declare global {
  interface Window {
    _miniNextData: Record<string, string>;
  }
}

export const hydrate = (Component: Function, container: HTMLElement) => {
  const content = Component(window._miniNextData);
  console.log('hydrate 완료');
  const element = makeDOM(content);
  root = container;
  prev = content;
  container.innerHTML = '';
  container.appendChild(element);
  callEffects();
};

export const rerender = () => {
  initializeIndex(); //리렌더시 useState의 index를 초기화
  initializeEffectIndex(); //useEffect index 초기화
  const updateElement = <App />;
  updateDOM(root, prev, updateElement);
  callEffects();
  prev = updateElement; //업데이트가 끝나면, 요소 업데이트
};

export const callEffects = () => {
  const effectArray = getEffectArray();
  effectArray.forEach((effect) => {
    if (effect.haveToCall) {
      effect.func();
      effect.haveToCall = false;
    }
  });
};
