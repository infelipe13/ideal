import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  expand?: boolean;
};

export const Button = ({ className, expand, ...rest }: Props) => {
  const classes = clsx(
    className,
    { 'w-full': expand },
    'inline-flex items-center justify-center px-16 py-8 font-medium text-white transition duration-200 ease-in-out bg-indigo-600 border border-transparent rounded cursor-pointer select-none text-x2 sm:max-w-sm hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-700'
  );

  return <button className={classes} {...rest} />;
};
