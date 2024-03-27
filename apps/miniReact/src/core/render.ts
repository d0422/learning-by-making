import App from '../App';
import { makeDOM } from './makeDOM';
import { updateDOM } from './updateDOM';
import { initializeIndex } from './useState';
import { MiniReactNode } from './createElement';

let prev: MiniReactNode; //이전의 virtual DOM
let root: Element; //최상단 root요소

export const render = (content: MiniReactNode, container: HTMLElement) => {
  root = container; //최상단 요소를 최초렌더(mount)시 등록
  prev = content; // 현재 virtual DOM을 최초 mount컴포넌트로 등록
  const element = makeDOM(content);
  container.appendChild(element);
};

export const rerender = () => {
  initializeIndex(); //리렌더시 useState의 index를 초기화
  const updateElement = App() as unknown as MiniReactNode;
  updateDOM(root, prev, updateElement);
  prev = updateElement; //업데이트가 끝나면, 요소 업데이트
};
