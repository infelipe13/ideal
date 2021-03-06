import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Container, Icon } from 'src/components';
import { Option } from 'src/components/Layout/Header/Option';
import { authService } from 'src/services';

export const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    await authService.logout();

    router.replace('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const menuIcon = isMenuOpen ? 'x' : 'menu';
  const showExit = router.pathname !== '/';
  const smNavClasses = clsx(isMenuOpen ? 'block' : 'hidden', 'sm:hidden');

  const ExitButton = () => {
    return showExit ? (
      <button
        className="hidden py-8 font-medium text-gray-700 text-x2 sm:block focus:outline-none"
        onClick={logout}
      >
        Sair
      </button>
    ) : null;
  };

  const SmExitButton = () => {
    return showExit ? (
      <button
        className="w-full px-16 py-8 font-medium text-left text-gray-700 border-l-4 border-transparent text-x2 focus:outline-none"
        onClick={logout}
      >
        Sair
      </button>
    ) : null;
  };

  return (
    <header className="flex-grow-0 bg-white shadow">
      <Container as="nav">
        <div className="flex justify-between h-64">
          <div className="flex space-x-8">
            <img
              alt=""
              className="self-center w-32 h-32"
              src="/assets/logo.svg"
            />
            <Option href="/score">Pontuar</Option>
          </div>
          <ExitButton />
          <div className="flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 text-gray-700 transition duration-200 ease-in-out rounded focus:bg-gray-200 focus:outline-none"
              onClick={toggleMenu}
            >
              <Icon className="w-32 h-32" name={menuIcon} />
            </button>
          </div>
        </div>
      </Container>
      <nav className={smNavClasses}>
        <Option hideAboveSm href="/score">
          Pontuar
        </Option>
        <SmExitButton />
      </nav>
    </header>
  );
};
