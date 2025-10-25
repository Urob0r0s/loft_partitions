from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer для модели Category.
    Преобразует объекты Category в JSON и обратно.
    """

    class Meta:
        model = Category
        fields = ['id', 'name', 'description']  # Поля, которые будут в JSON
        # 'id' автоматически создается Django для каждой модели


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer для модели Product.
    Включает информацию о категории в читаемом виде.
    """
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'price',
            'category',  # ID категории для создания/обновления
            'category_name',  # Название категории для чтения
            'image',
            'is_active'
        ]
        # read_only_fields - поля только для чтения (нельзя изменить через API)
        read_only_fields = ['category_name']