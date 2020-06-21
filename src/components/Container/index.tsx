import clsx from 'clsx';
import { createElement } from 'react';

type Props = {
  as?: keyof React.ReactHTML;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

export const Container = ({
  as = 'div',
  children,
  className,
  ...rest
}: Props) => {
  const props = {
    ...rest,
    className: clsx(className, 'px-16 mx-auto max-w-7xl sm:px-32'),
  };

  return createElement(as, props, children);
};
