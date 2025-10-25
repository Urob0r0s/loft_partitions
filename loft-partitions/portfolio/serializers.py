from rest_framework import serializers
from .models import PortfolioProject, ProjectImage, CustomerReview


class ProjectImageSerializer(serializers.ModelSerializer):
    """
    Serializer для изображений проекта.
    """
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'image_url', 'caption', 'order', 'is_main']
        read_only_fields = ['id', 'image_url']

    def get_image_url(self, obj):
        """
        Возвращает полный URL изображения.
        """
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None


class CustomerReviewSerializer(serializers.ModelSerializer):
    """
    Serializer для отзывов клиентов.
    """

    class Meta:
        model = CustomerReview
        fields = ['id', 'customer_name', 'review_text', 'rating', 'created_at']
        read_only_fields = ['id', 'created_at']


class PortfolioProjectListSerializer(serializers.ModelSerializer):
    """
    Упрощенный Serializer для списка проектов.
    Используется когда не нужны все детали.
    """
    main_image = serializers.SerializerMethodField()
    used_products_count = serializers.SerializerMethodField()

    class Meta:
        model = PortfolioProject
        fields = [
            'id',
            'title',
            'project_type',
            'area',
            'completion_date',
            'main_image',
            'used_products_count'
        ]

    def get_main_image(self, obj):
        """Возвращает URL главного изображения."""
        main_image = obj.images.filter(is_main=True).first()
        if not main_image:
            main_image = obj.images.first()

        if main_image:
            request = self.context.get('request')
            if request and main_image.image:
                return request.build_absolute_uri(main_image.image.url)
        return None

    def get_used_products_count(self, obj):
        """Возвращает количество использованных продуктов."""
        return obj.used_products.count()