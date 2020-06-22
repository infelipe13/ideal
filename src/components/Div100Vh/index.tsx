import { createElement, useEffect, useState } from 'react';

type Props = {
  as?: keyof React.ReactHTML;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
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
