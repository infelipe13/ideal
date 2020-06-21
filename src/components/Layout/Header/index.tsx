import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Container, Icon } from 'src/components';
import { Option } from 'src/components/Layout/Header/Option';

export const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout');

      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const menuIcon = isMenuOpen ? 'x' : 'menu';
  const smNavClasses = clsx(isMenuOpen ? 'block' : 'hidden', 'sm:hidden');

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
          <button
            className="hidden py-8 font-medium text-gray-500 text-x2 sm:block focus:outline-none"
            onClick={logout}
          >
            Sair
          </button>
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
        <button
          className="w-full px-16 py-8 font-medium text-left text-gray-500 border-l-4 border-transparent text-x2 focus:outline-none"
          onClick={logout}
        >
          Sair
        </button>
      </nav>
    </header>
  );
};
