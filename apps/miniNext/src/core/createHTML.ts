import { MiniReactNode } from './jsx-runtime';

export const createHTML = (
  element: MiniReactNode,
  initialServerProps?: Record<string, string>,
  fileName?: string
) => {
  const root = `
  <html>
  <head>
    <title>MiniNext</title>
  </head>
  <body>
  <div id="_miniNext">${_createHTML(element)}</div>
  </body>
  <script>
    window._miniNextData=${JSON.stringify(initialServerProps)}
  </script>
  <script src='${fileName}.js'></script>
  </html>`;
  return root;
};

const _createHTML = (element: string | MiniReactNode) => {
  if (typeof element === 'string' || typeof element === 'number') {
    //element가 text거나 number인 경우 그냥 내보낸다.
    return element;
  }

  // 태그 열기
  let HTMLString = `<${element.tagName} `;
  let styleProps = ``;
  if (element.props) {
    //props를 HTML attribute로 붙인다.
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
    //children에 대해 재귀적으로 HTML을 생성해 붙인다.
    element.props.children.forEach((child) => {
      HTMLString += _createHTML(child);
    });
  }
  HTMLString += `</${element.tagName}>`;
  return HTMLString; //최종 생성된 HTML을 반환한다.
};
