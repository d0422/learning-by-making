export interface MiniReactNode {
  tagName: string;
  props: Record<string, unknown>;
  children: MiniReactNode[];
  ref?: HTMLElement;
}

export const createElement = (
  tagName: Function,
  props: Record<string, string>,
  ...children: MiniReactNode[]
) => {
  if (typeof tagName === 'function') {
    return tagName(props, ...children);
  }
  if (Array.isArray(children)) {
    children = children.flat();
  }
  children = children.filter((child: any) => {
    if (typeof child === 'number') return true;
    return Boolean(child);
  });
  return {
    tagName,
    props,
    children,
  } as MiniReactNode;
};
