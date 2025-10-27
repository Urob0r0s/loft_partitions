from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class PortfolioProject(models.Model):
    """
    Модель для проектов в портфолио.
    Каждый проект - это пример выполненной работы.
    """
    # Основная информация о проекте
    title = models.CharField(
        max_length=200,
        verbose_name='Название проекта'
    )
    description = models.TextField(
        verbose_name='Описание проекта'
    )

    # Детали проекта
    project_type = models.CharField(
        max_length=100,
        choices=[
            ('residential', 'Жилой помещение'),
            ('commercial', 'Коммерческое помещение'),
            ('office', 'Офис'),
            ('other', 'Другое'),
        ],
        verbose_name='Тип помещения'
    )

    # Размеры и параметры
    area = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        validators=[MinValueValidator(0.1)],
        verbose_name='Площадь (м²)',
        help_text='Площадь помещения в квадратных метрах'
    )

    # Сроки выполнения
    completion_date = models.DateField(
        verbose_name='Дата завершения'
    )

    # Связь с продуктами (какие перегородки использовались)
    used_products = models.ManyToManyField(
        'products.Product',
        blank=True,
        verbose_name='Использованные продукты',
        help_text='Какие перегородки были установлены в этом проекте'
    )

    # Статус и видимость
    is_published = models.BooleanField(
        default=True,
        verbose_name='Опубликовано'
    )

    # Системные поля
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления'
    )

    class Meta:
        verbose_name = 'Проект портфолио'
        verbose_name_plural = 'Проекты портфолио'
        ordering = ['-completion_date']  # Сортировка по дате (новые сначала)

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    """
    Модель для изображений проекта.
    Один проект может иметь несколько изображений.
    """
    project = models.ForeignKey(
        PortfolioProject,
        on_delete=models.CASCADE,
        related_name='images',  # Доступ через project.images.all()
        verbose_name='Проект'
    )

    image = models.ImageField(
        upload_to='portfolio/%Y/%m/%d/',  # Папка с датой для организации
        verbose_name='Изображение'
    )

    caption = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='Подпись к изображению'
    )

    # Поле для указания порядка отображения
    order = models.PositiveIntegerField(
        default=0,
        verbose_name='Порядок отображения'
    )

    is_main = models.BooleanField(
        default=False,
        verbose_name='Главное изображение',
        help_text='Использовать как основное изображение проекта'
    )

    class Meta:
        verbose_name = 'Изображение проекта'
        verbose_name_plural = 'Изображения проектов'
        ordering = ['order', 'id']  # Сортировка по порядку и ID

    def __str__(self):
        return f"Изображение для {self.project.title}"


class CustomerReview(models.Model):
    """
    Модель для отзывов клиентов о проектах.
    """
    project = models.OneToOneField(
        PortfolioProject,
        on_delete=models.CASCADE,
        related_name='review',
        verbose_name='Проект'
    )

    customer_name = models.CharField(
        max_length=100,
        verbose_name='Имя клиента'
    )

    review_text = models.TextField(
        verbose_name='Текст отзыва'
    )

    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name='Оценка',
        help_text='Оценка от 1 до 5 звезд'
    )

    is_approved = models.BooleanField(
        default=False,
        verbose_name='Одобрено для публикации'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'Отзыв клиента'
        verbose_name_plural = 'Отзывы клиентов'

    def __str__(self):
        return f"Отзыв от {self.customer_name} для {self.project.title}"

