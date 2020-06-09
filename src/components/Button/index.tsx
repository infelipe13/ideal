import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  expand?: boolean;
};

export const Button = ({ children, expand, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={clsx(
        { 'w-full': expand },
        'inline-flex items-center justify-center px-16 py-8 font-medium text-white transition duration-200 ease-in-out bg-indigo-600 border border-transparent rounded shadow-sm cursor-pointer select-none text-x2 hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-700'
      )}
    >
      {children}
    </button>
  );
};
