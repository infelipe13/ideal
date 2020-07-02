import clsx from 'clsx';
import { createElement } from 'react';

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: keyof React.ReactHTML;
};

export const Container = ({
  as = 'div',
  children,
  className,
  ...rest
}: Props) =>
  createElement(
    as,
    {
      ...rest,
      className: clsx(className, 'px-16 mx-auto max-w-7xl sm:px-32'),
    },
    children
  );
