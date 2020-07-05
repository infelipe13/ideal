import clsx from 'clsx';

import { ActiveLink } from 'src/components';

type Props = {
  hideAboveSm?: boolean;
  children: React.ReactNode;
  href: string;
};

export const Option = ({ hideAboveSm, ...rest }: Props) => {
  const classes = clsx(
    hideAboveSm ? 'inline-flex w-full sm:hidden' : 'hidden sm:inline-flex',
    'items-center px-16 py-8 font-medium text-gray-700 transition duration-200 ease-in-out border-l-4 border-transparent cursor-pointer text-x2 sm:pt-2 sm:pb-0 sm:border-b-4 sm:border-l-0 hover:border-gray-300'
  );

  return (
    <ActiveLink
      activeClassName="bg-indigo-100 border-indigo-700 font-bold text-indigo-700 hover:border-indigo-700"
      className={classes}
      {...rest}
    />
  );
};
