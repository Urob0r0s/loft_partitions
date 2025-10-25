from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet

# Создаем router для автоматической генерации URL
router = DefaultRouter()
router.register(r'categories', CategoryViewSet)  # /api/categories/
router.register(r'products', ProductViewSet)     # /api/products/

urlpatterns = [
    path('', include(router.urls)),
]