import axios from 'axios';

// Базовый URL нашего Django API
const API_BASE_URL = 'http://localhost:8000/api';

// Создаем экземпляр axios с настройками
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// API методы для продуктов
export const productsAPI = {
  // Получить все продукты
  getProducts: () => api.get('/products/products/'),

  // Получить категории
  getCategories: () => api.get('/products/categories/'),
};

// API методы для портфолио
export const portfolioAPI = {
  // Получить все проекты
  getProjects: () => api.get('/portfolio/projects/'),
};

export default api;