from django.contrib import admin
from .models import PortfolioProject, ProjectImage, CustomerReview


class ProjectImageInline(admin.TabularInline):
    """
    Inline для отображения изображений внутри формы проекта.
    Позволяет добавлять/редактировать изображения на той же странице, что и проект.
    """
    model = ProjectImage
    extra = 1  # Количество пустых форм для новых изображений
    fields = ['image', 'caption', 'order', 'is_main']


@admin.register(PortfolioProject)
class PortfolioProjectAdmin(admin.ModelAdmin):
    # Поля в списке проектов
    list_display = ['title', 'project_type', 'area', 'completion_date', 'is_published']
    list_filter = ['project_type', 'is_published', 'completion_date']
    search_fields = ['title', 'description']

    # Inline для изображений
    inlines = [ProjectImageInline]

    # Поля в форме редактирования
    fieldsets = [
        ('Основная информация', {
            'fields': ['title', 'description', 'project_type']
        }),
        ('Детали проекта', {
            'fields': ['area', 'completion_date', 'used_products']
        }),
        ('Статус', {
            'fields': ['is_published']
        }),
    ]


@admin.register(CustomerReview)
class CustomerReviewAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'project', 'rating', 'is_approved']
    list_filter = ['rating', 'is_approved']
    search_fields = ['customer_name', 'project__title']

