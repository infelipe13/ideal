import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

export const Panel = ({ children, className, id, style }: Props) => {
  return (
    <div
      id={id}
      className={clsx(
        className,
        'p-16 overflow-hidden rounded shadow bg-white'
      )}
      style={style}
    >
      {children}
    </div>
  );
};
