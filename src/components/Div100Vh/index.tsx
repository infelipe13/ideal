import { createElement, useEffect, useState } from 'react';

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: keyof React.ReactHTML;
};

export const Div100Vh = ({ as = 'div', children, style, ...rest }: Props) => {
  const [minHeight, setMinHeight] = useState('');
  const props = { ...rest, style: { ...style, minHeight } };

  const updateMinHeight = () => {
    setMinHeight(`${window.innerHeight}px`);
  };

  useEffect(() => {
    setMinHeight(`${window.innerHeight}px`);
    window.addEventListener('resize', updateMinHeight);

    return () => {
      window.removeEventListener('resize', updateMinHeight);
    };
  }, []);

  return createElement(as, props, children);
};
