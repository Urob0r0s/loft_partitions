from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import PortfolioProject, ProjectImage, CustomerReview
from .serializers import (
    PortfolioProjectSerializer,
    PortfolioProjectListSerializer,
    ProjectImageSerializer,
    CustomerReviewSerializer
)

class PortfolioProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet для работы с проектами портфолио.
    """
    queryset = PortfolioProject.objects.filter(is_published=True)

    # Разные сериализаторы для разных действий
    serializer_class = PortfolioProjectSerializer

    # Фильтрация и поиск
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project_type']  # Фильтрация по типу помещения
    search_fields = ['title', 'description']  # Поиск по названию и описанию
    ordering_fields = ['completion_date', 'area', 'created_at']  # Сортировка
    ordering = ['-completion_date']  # По умолчанию новые сначала

    def get_serializer_class(self):
        """
        Выбираем сериализатор в зависимости от действия.
        Для списка используем упрощенный сериализатор.
        """
        if self.action == 'list':
            return PortfolioProjectListSerializer
        return PortfolioProjectSerializer

    def get_queryset(self):
        """
        Дополнительная фильтрация queryset.
        """
        queryset = super().get_queryset()

        # Фильтрация по продуктам (если передан параметр product)
        product_id = self.request.query_params.get('product')
        if product_id:
            queryset = queryset.filter(used_products__id=product_id)

        # Фильтрация по минимальной площади
        min_area = self.request.query_params.get('min_area')
        if min_area:
            queryset = queryset.filter(area__gte=min_area)

        return queryset.prefetch_related('images', 'used_products')

    @action(detail=True, methods=['get'])
    def similar_projects(self, request, pk=None):
        """
        Кастомное действие для получения похожих проектов.
        Пример: /api/portfolio/1/similar_projects/
        """
        project = self.get_object()

        # Находим проекты того же типа
        similar = PortfolioProject.objects.filter(
            project_type=project.project_type,
            is_published=True
        ).exclude(id=project.id)[:4]  # Исключаем текущий, берем 4 проекта

        serializer = PortfolioProjectListSerializer(
            similar,
            many=True,
            context={'request': request}
        )

        return Response(serializer.data)


class CustomerReviewViewSet(viewsets.ModelViewSet):
    """
    ViewSet для работы с отзывами клиентов.
    """
    queryset = CustomerReview.objects.filter(is_approved=True)
    serializer_class = CustomerReviewSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['rating', 'created_at']
    ordering = ['-created_at']  # Новые отзывы сначала

    def get_queryset(self):
        """
        Фильтрация отзывов по проекту.
        """
        queryset = super().get_queryset()

        project_id = self.request.query_params.get('project')
        if project_id:
            queryset = queryset.filter(project_id=project_id)

        return queryset