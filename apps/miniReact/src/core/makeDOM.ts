import { MiniReactNode } from './createElement';

export const makeDOM = (element: string | MiniReactNode) => {
  if (typeof element === 'string' || typeof element === 'number') {
    //element가 text거나 number인 경우 textNode로 만든다.
    return document.createTextNode(String(element));
  }

  const DOMElement = document.createElement(element.tagName);
  if (element.props)
    //props를 실제 DOM요소에 적용시킨다.
    Object.keys(element.props).forEach((key) => {
      if (key === 'style') {
        const styleObject = element.props[key] as Record<string, string>;
        Object.entries(styleObject).forEach(([key, value]) => {
          (DOMElement as any).style[key] = value;
        });
        return;
      }
      (DOMElement as any)[key] = element.props[key];
    });
  if (element.children) {
    //children에 대해 재귀적으로 DOM요소를 만들어 현재 요소에 붙인다.
    element.children.forEach((child) => {
      DOMElement.appendChild(makeDOM(child));
    });
  }
  element.ref = DOMElement; //여기 추가!!
  return DOMElement; //최종 생성된 DOM요소를 반환한다.;
};
