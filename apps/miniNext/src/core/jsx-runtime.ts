type DefaultProps = Record<string, string>;
type Props = DefaultProps & {
  children?: MiniReactNode[];
};

export interface MiniReactNode {
  tagName: string;
  props: Props;
  ref?: HTMLElement;
}

const getChildren = (props: Props) => {
  if (Array.isArray(props.children)) return [...props.children];
  if (props.children === undefined) return [];
  return [props.children];
};

export const jsx = (tagName: Function, props: Props) => {
  props.children = getChildren(props);

  if (typeof tagName === 'function') return tagName(props);
  props.children = props.children.flat();
  props.children = props.children.filter((child: any) => {
    if (typeof child === 'number') return true;
    return Boolean(child);
  });

  return {
    tagName,
    props,
  } as MiniReactNode;
};

export const jsxs = jsx;
