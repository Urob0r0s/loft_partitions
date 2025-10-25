from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortfolioProjectViewSet, CustomerReviewViewSet

router = DefaultRouter()
router.register(r'projects', PortfolioProjectViewSet, basename='portfolio-project')
router.register(r'reviews', CustomerReviewViewSet, basename='customer-review')

urlpatterns = [
    path('', include(router.urls)),
]