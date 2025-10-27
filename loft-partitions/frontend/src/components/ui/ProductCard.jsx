import React from 'react';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {/* Изображение продукта */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-center">
            <div className="text-4xl mb-2">🏗️</div>
            <p>Изображение</p>
          </div>
        )}
      </div>

      {/* Информация о продукте */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Категория */}
        {product.category_name && (
          <div className="mb-3">
            <span className="inline-block bg-blue-900 text-white text-xs px-2 py-1 rounded">
              {product.category_name}
            </span>
          </div>
        )}

        {/* Цена и кнопка */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded font-medium">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;