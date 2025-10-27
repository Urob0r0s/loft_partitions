import React, { useState, useMemo } from 'react';
import { useProducts, useCategories } from '../hooks/useApi';
import ProductCard from '../components/ui/ProductCard';
import ProductFilters from '../components/ui/ProductFilters';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Home = () => {
  // Состояние фильтров
  const [selectedCategory, setSelectedCategory] = useState('');

  // Загружаем все продукты и категории
  const { data: allProducts, loading: productsLoading, error: productsError } = useProducts();
  const { data: categories, loading: categoriesLoading } = useCategories();

  // Фильтруем продукты на клиенте
  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];

    let filtered = [...allProducts];

    // Фильтрация по категории
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category.toString() === selectedCategory
      );
    }

    return filtered;
  }, [allProducts, selectedCategory]);

  // Обработчики фильтров
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero секция */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Лофт Перегородки
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Создаем уникальные пространства с современными перегородками
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded text-lg">
              Рассчитать стоимость
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-3 px-8 rounded text-lg transition">
              Смотреть портфолио
            </button>
          </div>
        </div>
      </section>

      {/* Секция продуктов с фильтрацией */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Наши Продукты
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Широкий выбор современных лофт перегородок для любого помещения
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Боковая панель с фильтрами */}
            <div className="lg:w-1/4">
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                onResetFilters={handleResetFilters}
              />
            </div>

            {/* Основной контент */}
            <div className="lg:w-3/4">
              {/* Статистика фильтрации */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-gray-600">
                    Найдено продуктов: {' '}
                    <strong className="text-gray-800">{filteredProducts.length}</strong>
                  </span>

                  {/* Активные фильтры */}
                  {selectedCategory && (
                    <div className="mt-2">
                      <span className="inline-flex items-center bg-blue-900 text-white text-xs px-2 py-1 rounded">
                        Категория: {categories.find(c => c.id.toString() === selectedCategory)?.name}
                        <button
                          onClick={() => setSelectedCategory('')}
                          className="ml-1 hover:text-gray-200"
                        >
                          ×
                        </button>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Состояние загрузки */}
              {(productsLoading || categoriesLoading) && <LoadingSpinner />}

              {/* Состояние ошибки */}
              {productsError && (
                <div className="text-center text-red-600 py-8">
                  <p>{productsError}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Убедитесь, что бэкенд сервер запущен на localhost:8000
                  </p>
                </div>
              )}

              {/* Сетка продуктов */}
              {!productsLoading && !categoriesLoading && !productsError && (
                <>
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Продукты не найдены
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Попробуйте изменить параметры фильтрации
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
                      >
                        Сбросить фильтры
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;