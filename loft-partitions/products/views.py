from rest_framework import viewsets, filters
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet для работы с категориями.
    Обеспечивает полный CRUD (Create, Read, Update, Delete) через API.
    """
    queryset = Category.objects.all()  # Какие данные берем из БД
    serializer_class = CategorySerializer  # Какой serializer использовать

    # Фильтрация и поиск
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']  # Поиск по названию категории


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet для работы с товарами.
    Включает фильтрацию по категории и поиск.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # Более сложная фильтрация
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']  # Поиск по названию и описанию
    ordering_fields = ['price', 'name']  # Сортировка по цене и названию
    ordering = ['name']  # Сортировка по умолчанию

    def get_queryset(self):
        """
        Переопределяем queryset для фильтрации только активных товаров
        и фильтрации по категории.
        """
        queryset = Product.objects.filter(is_active=True)

        # Фильтрация по категории (если передан параметр category)
        category_id = self.request.query_params.get('category')
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        return queryset