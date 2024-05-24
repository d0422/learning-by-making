import { MiniReactNode } from './jsx-runtime';

export const createHTML = (element: string | MiniReactNode) => {
  if (typeof element === 'string' || typeof element === 'number') {
    //element가 text거나 number인 경우 textNode로 만든다.
    return element;
  }

  // 태그 열기
  let HTMLString = `<${element.tagName} `;
  let styleProps = ``;
  if (element.props) {
    //props를 HTML String에 붙인다.
    Object.keys(element.props).forEach((key) => {
      if (key === 'style') {
        const styleObject = element.props[key];
        Object.entries(styleObject).forEach(([key, value]) => {
          styleProps += `${key}: ${value}; `;
        });
        HTMLString += `style= "${styleProps}"`;
      } else if (key !== 'children') {
        HTMLString += `${key}= "${element.props[key]}" `;
      }
    });
  }
  HTMLString = HTMLString.trimEnd();
  HTMLString += '>';
  if (element.props.children) {
    //children에 대해 재귀적으로 DOM요소를 만들어 현재 요소에 붙인다.
    element.props.children.forEach((child) => {
      HTMLString += createHTML(child);
    });
  }
  HTMLString += `</${element.tagName}>`;
  return HTMLString; //최종 생성된 DOM요소를 반환한다.;
};
