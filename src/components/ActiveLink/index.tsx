import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

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
}: Props) => {
  const { pathname } = useRouter();

  return (
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
        className={clsx(className, pathname === href && activeClassName)}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
};
