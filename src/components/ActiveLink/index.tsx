import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import Router from 'next/router';

type Props = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    activeClassName: string;
  };

export const ActiveLink = ({
  as,
  activeClassName,
  children,
  className,
  href,
  passHref,
  prefetch,
  replace,
  scroll,
  shallow,
  ...rest
}: Props) => (
  <Link
    as={as}
    href={href}
    passHref={passHref}
    prefetch={prefetch}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
  >
    <a
      className={clsx(className, Router.pathname === href && activeClassName)}
      {...rest}
    >
      {children}
    </a>
  </Link>
);
