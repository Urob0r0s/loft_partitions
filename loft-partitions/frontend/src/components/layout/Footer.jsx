import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* О компании */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">LoftPartitions</h3>
            <p className="text-gray-300 mb-4">
              Производство и установка современных лофт перегородок.
              Создаем уникальные пространства с 2020 года.
            </p>
          </div>

          {/* Навигация */}import React from 'react';
import './index.css';

// Простой компонент для теста
const SimpleHome = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-900">LoftPartitions</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Тестовая страница</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>Если это видно - Layout работает!</p>
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Футер</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return <SimpleHome />;
}

export default App;
          <div>
            <h4 className="text-lg font-semibold mb-4">Навигация</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-white transition">
                Главная
              </Link>
              <Link to="/products" className="text-gray-300 hover:text-white transition">
                Каталог
              </Link>
              <Link to="/portfolio" className="text-gray-300 hover:text-white transition">
                Портфолио
              </Link>
              <Link to="/contacts" className="text-gray-300 hover:text-white transition">
                Контакты
              </Link>
            </nav>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="text-gray-300 space-y-2">
              <p>📞 +7 (999) 123-45-67</p>
              <p>✉️ info@loftpartitions.ru</p>
              <p>🕒 Пн-Пт: 9:00-18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 LoftPartitions. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;