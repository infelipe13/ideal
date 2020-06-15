import clsx from 'clsx';
import { useState } from 'react';

import { Container, Icon } from 'src/components';
import { Option } from 'src/components/Layout/Header/Option';

export const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex-grow-0 shadow">
      <Container>
        <div className="flex justify-between h-64">
          <div className="flex">
            <div className="flex items-center flex-shrink-0">
              <img alt="" className="w-32 h-32" src="/assets/logo.svg" />
            </div>
            <div className="hidden sm:flex sm:ml-8">
              <Option href="/dashboard">Dashboard</Option>
            </div>
          </div>
          <button
            className="hidden py-8 font-medium text-gray-500 text-x2 focus:outline-none sm:block"
            onClick={() => {}}
          >
            Sair
          </button>
          <div className="flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 text-gray-700 transition duration-200 ease-in-out rounded focus:bg-gray-200 focus:outline-none"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? 'x' : 'menu'} className="w-32 h-32" />
            </button>
          </div>
        </div>
      </Container>
      <div className={clsx(isMenuOpen ? 'block' : 'hidden', 'sm:hidden')}>
        <Option href="/dashboard">Dashboard</Option>
        <button
          className="w-full px-16 py-8 font-medium text-left text-gray-500 border-l-4 border-transparent text-x2 focus:outline-none"
          onClick={() => {}}
        >
          Sair
        </button>
      </div>
    </header>
  );
};
