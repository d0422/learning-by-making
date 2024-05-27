import {
  getDeleteKeysArray,
  getDiffKeysObject,
  getNewKeysObject,
} from '@/utils/object';
import { makeDOM } from './createDOM';
import { MiniReactNode } from './jsx-runtime';
import { createArray, getLongerArrayLength } from '@/utils/array';

const updateAttributes = (
  target: Element,
  newProps: Record<string, unknown>,
  oldProps: Record<string, unknown>
) => {
  const diffProps = getDiffKeysObject(
    oldProps as Record<string, string>,
    newProps as Record<string, string>
  );
  const addedProps = getNewKeysObject(
    oldProps as Record<string, string>,
    newProps as Record<string, string>
  );
  const deletedProps = getDeleteKeysArray(
    oldProps as Record<string, string>,
    newProps as Record<string, string>
  );
  if (
    Object.keys(diffProps).length === 0 &&
    Object.keys(addedProps).length === 0 &&
    deletedProps.length === 0
  )
    return;
  deletedProps.forEach((key) => {
    if (key === 'children') return;

    if (key.match(/^on/)) {
      (target as any)[key] = null;
    }
    if (key === 'className') {
      target.removeAttribute('class');
    }
    delete (target as any)[key];
    target.removeAttribute(key);
  });

  Object.keys({ ...diffProps, ...addedProps }).forEach((key) => {
    if (key === 'children') return;
    (target as any)[key] = newProps[key];

    if (key === 'style') {
      const styleObject = newProps[key] as Record<string, string>;
      Object.entries(styleObject).forEach(([key, value]) => {
        (target as any).style[key] = value;
      });
    }
  });
};

export const updateDOM = (
  parent: Element,
  prev: MiniReactNode,
  cur: MiniReactNode,
  index = 0
) => {
  const childNode = parent.childNodes[index];
  if (prev && cur === undefined) {
    if (typeof prev === 'string' || typeof prev === 'number') {
      return (parent.innerHTML = '');
    }
    return prev.ref?.remove();
  }
  if (prev === undefined && cur) {
    return parent.appendChild(makeDOM(cur));
  }
  if (
    (typeof cur === 'string' && typeof prev === 'string') ||
    (typeof cur === 'number' && typeof prev === 'number')
  ) {
    if (cur === prev) return;
    if (childNode) return parent.replaceChild(makeDOM(cur), childNode);
  }
  if (cur.tagName !== prev.tagName) {
    if (childNode) return parent.replaceChild(makeDOM(cur), childNode);
  }
  if (parent.children[index]) {
    updateAttributes(parent.children[index], cur.props || {}, prev.props || {});
    const length = getLongerArrayLength(
      prev.props.children,
      cur.props.children
    );

    createArray(length).forEach((i) =>
      updateDOM(
        parent.children[index],
        prev.props.children[i],
        cur.props.children[i],
        i
      )
    );
  }
  cur.ref = prev.ref;
};
