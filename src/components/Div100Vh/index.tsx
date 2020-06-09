import { useEffect, useState } from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

const RESIZE_EVENT_NAME = 'resize';

export const Div100Vh = ({ children, className, id, style }: Props) => {
  const [minHeight, setMinHeight] = useState('');

  const updateMinHeight = () => {
    setMinHeight(`${window.innerHeight}px`);
  };

  useEffect(() => {
    setMinHeight(`${window.innerHeight}px`);
    window.addEventListener(RESIZE_EVENT_NAME, updateMinHeight);

    return () => {
      return window.removeEventListener(RESIZE_EVENT_NAME, updateMinHeight);
    };
  }, []);

  return (
    <div id={id} className={className} style={{ ...style, minHeight }}>
      {children}
    </div>
  );
};
