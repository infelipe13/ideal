import { ActiveLink } from 'src/components/ActiveLink';

type Props = {
  children: React.ReactNode;
  href: string;
};

export const Option = ({ children, ...rest }: Props) => {
  return (
    <ActiveLink
      {...rest}
      activeClassName="bg-indigo-100 border-indigo-700 font-bold text-indigo-700 hover:border-indigo-700"
      className="items-center block px-16 py-8 font-medium text-gray-700 transition duration-200 ease-in-out border-l-4 border-transparent text-x2 sm:inline-flex sm:pt-2 sm:pb-0 sm:border-b-4 sm:border-l-0 hover:border-gray-300"
    >
      {children}
    </ActiveLink>
  );
};
