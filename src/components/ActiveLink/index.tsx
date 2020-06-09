import clsx from 'clsx';
import { useRouter } from 'next/router';

type Props = {
  activeClassName?: string;
  className?: string;
  children: React.ReactNode;
  href: string;
};

export const ActiveLink = ({
  activeClassName,
  children,
  className,
  href,
}: Props) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      className={clsx(
        router.pathname === href ? activeClassName : '',
        className
      )}
      href={href}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
