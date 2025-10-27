import React from 'react';

const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onResetFilters
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Фильтры</h3>
        <button
          onClick={onResetFilters}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Сбросить все
        </button>
      </div>

      {/* Фильтр по категориям */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-3">Категория</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="mr-3 text-red-600 focus:ring-red-600"
            />
            <span className="text-gray-700">Все категории</span>
          </label>

          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id.toString()}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="mr-3 text-red-600 focus:ring-red-600"
              />
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;