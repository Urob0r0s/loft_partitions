import React from 'react';

const Hero = () => {
  return (
    <section className="hero-gradient min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Лофт Перегородки
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Создаем уникальные пространства с современными перегородками.
            Индивидуальный подход и качественные материалы.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Рассчитать стоимость
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 rounded transition duration-200">
              Смотреть портфолио
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;