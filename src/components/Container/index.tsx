import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

export const Container = ({ children, className, id, style }: Props) => {
  return (
    <div
      id={id}
      className={clsx(className, 'px-16 mx-auto max-w-7xl sm:px-32')}
      style={style}
    >
      {children}
    </div>
  );
};
