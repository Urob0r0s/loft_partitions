import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AIChatWidget from './components/ai/AIChatWidget';
import './index.css';

// Импортируем наши страницы
import Home from './pages/Home';
import Products from './pages/Products';
import Portfolio from './pages/Portfolio';
import Contacts from './pages/Contacts';

// Простой Layout компонент
const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-blue-900">LoftPartitions</h1>
          <nav className="space-x-6">
            <a href="/" className="text-gray-700 hover:text-red-600 font-medium">Главная</a>
            <a href="/products" className="text-gray-700 hover:text-red-600 font-medium">Продукты</a>
            <a href="/portfolio" className="text-gray-700 hover:text-red-600 font-medium">Портфолио</a>
            <a href="/contacts" className="text-gray-700 hover:text-red-600 font-medium">Контакты</a>
          </nav>
        </div>
      </div>
    </header>

    <main className="flex-grow">
      {children}
    </main>

    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 LoftPartitions. Все права защищены.</p>
      </div>
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
        <AIChatWidget />
      </Layout>
    </Router>
  );
}

export default App;