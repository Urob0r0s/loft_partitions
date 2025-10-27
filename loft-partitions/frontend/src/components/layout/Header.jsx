import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Логотип */}
          <Link to="/" className="text-2xl font-bold text-blue-900">
            LoftPartitions
          </Link>

          {/* Навигация */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-red-600">
              Главная
            </Link>
            <Link to="/products" className="font-medium text-gray-700 hover:text-red-600">
              Каталог
            </Link>
            <Link to="/portfolio" className="font-medium text-gray-700 hover:text-red-600">
              Портфолио
            </Link>
            <Link to="/contacts" className="font-medium text-gray-700 hover:text-red-600">
              Контакты
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;