import clsx from 'clsx';
import { createElement } from 'react';

type Props = {
  as?: keyof React.ReactHTML;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

export const Panel = ({ as = 'div', children, className, ...rest }: Props) => {
  const props = {
    ...rest,
    className: clsx(className, 'p-16 overflow-hidden rounded shadow bg-white'),
  };

  return createElement(as, props, children);
};
