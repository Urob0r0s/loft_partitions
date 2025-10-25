from django.contrib import admin
from .models import Category, Product

# admin.site.register(Category)
# admin.site.register(Product)


# Регистрируем модель Category для отображения в админке
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    # Поля, которые будут отображаться в списке категорий
    list_display = ['name', 'description']
    # Поле для поиска по названию
    search_fields = ['name']

# Регистрируем модель Product
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # Поля в списке товаров
    list_display = ['name', 'price', 'category', 'is_active']
    # Добавляем фильтр по категории и активности
    list_filter = ['category', 'is_active']
    # Поля для поиска
    search_fields = ['name', 'description']
    # Группировка полей в форме редактирования
    fieldsets = [
        ('Основная информация', {
            'fields': ['name', 'description', 'category']
        }),
        ('Цена и изображение', {
            'fields': ['price', 'image']
        }),
        ('Статус', {
            'fields': ['is_active']
        }),
    ]