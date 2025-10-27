import { useState, useEffect } from 'react';
import { productsAPI, portfolioAPI } from '../services/api';

// Хук для работы с продуктами
export const useProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getProducts();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке продуктов');
        console.error('Products API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { data, loading, error };
};

// Хук для работы с категориями
export const useCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getCategories();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке категорий');
        console.error('Categories API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { data, loading, error };
};