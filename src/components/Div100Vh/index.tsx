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

  const handleResize = () => {
    setMinHeight(`${window.innerHeight}px`);
  };

  useEffect(() => {
    setMinHeight(`${window.innerHeight}px`);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return createElement(as, props, children);
};
