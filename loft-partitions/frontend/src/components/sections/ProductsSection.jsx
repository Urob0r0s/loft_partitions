import React, { useState, useMemo } from 'react';
import { useProducts, useCategories } from '../../hooks/useApi';
import ProductCard from '../ui/ProductCard';
import ProductFilters from '../ui/ProductFilters';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProductsSection = () => {
  // Состояние фильтров
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

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

    // Фильтрация по цене
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(product =>
          product.price >= min && product.price <= max
        );
      } else {
        filtered = filtered.filter(product => product.price >= min);
      }
    }

    return filtered;
  }, [allProducts, selectedCategory, priceRange]);

  // Обработчики фильтров
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setPriceRange('');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">
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
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRange}
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
                  <strong className="text-dark">{filteredProducts.length}</strong>
                </span>

                {/* Активные фильтры */}
                {(selectedCategory || priceRange) && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCategory && (
                      <span className="inline-flex items-center bg-primary text-white text-xs px-2 py-1 rounded">
                        Категория: {categories.find(c => c.id.toString() === selectedCategory)?.name}
                        <button
                          onClick={() => setSelectedCategory('')}
                          className="ml-1 hover:text-gray-200"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {priceRange && (
                      <span className="inline-flex items-center bg-accent text-white text-xs px-2 py-1 rounded">
                        Цена: {priceRange === '0-20000' ? 'До 20,000 ₽' :
                               priceRange === '20000-40000' ? '20,000-40,000 ₽' :
                               'От 40,000 ₽'}
                        <button
                          onClick={() => setPriceRange('')}
                          className="ml-1 hover:text-gray-200"
                        >
                          ×
                        </button>
                      </span>
                    )}
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
                    <h3 className="text-xl font-semibold text-dark mb-2">
                      Продукты не найдены
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Попробуйте изменить параметры фильтрации
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="btn-primary"
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
  );
};

export default ProductsSection;