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
  className,
  href,
  ...rest
}: Props) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const classes = clsx(isActive ? activeClassName : '', className);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return <a className={classes} onClick={handleClick} {...rest} />;
};
