import json
import uuid
import requests
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ChatSession, ChatMessage
from .serializers import ChatSessionSerializer, ChatMessageSerializer

# Отключаем SSL предупреждения для разработки
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class ChatSessionViewSet(viewsets.ModelViewSet):
    """ViewSet для работы с сессиями чата с GigaChat"""
    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer

    def get_gigachat_token(self):
        """Получение OAuth токена для GigaChat API - РАБОЧАЯ ВЕРСИЯ"""
        try:
            print("🔑 Получение токена GigaChat...")

            url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
            payload = 'scope=GIGACHAT_API_PERS'

            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'RqUID': str(uuid.uuid4()),
                'Authorization': f'Basic {settings.GIGACHAT_API_KEY}'
            }

            response = requests.post(
                url,
                data=payload,
                headers=headers,
                verify=False,
                timeout=30
            )

            print(f"📊 Статус токена: {response.status_code}")

            if response.status_code == 200:
                token_data = response.json()
                access_token = token_data.get('access_token')
                print("✅ Токен успешно получен!")
                return access_token
            else:
                print(f"❌ Ошибка получения токена: {response.status_code} - {response.text}")
                return None

        except Exception as e:
            print(f"❌ Ошибка: {e}")
            return None

    def send_message_to_gigachat(self, message, access_token):
        """Отправка сообщения в GigaChat - РАБОЧАЯ ВЕРСИЯ"""
        try:
            print("💬 Отправка сообщения в GigaChat...")

            url = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"

            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}',
                'Accept': 'application/json'
            }

            # Промпт для AI-консультанта по перегородкам
            system_prompt = """Ты - профессиональный консультант по лофт перегородкам компании "LoftPartitions". 

О компании: Мы специализируемся на производстве и установке стеклянных, деревянных и комбинированных перегородок.

Твои задачи:
1. Консультировать клиентов по выбору перегородок
2. Задавать уточняющие вопросы о помещении (тип, площадь, назначение)
3. Рекомендовать подходящие материалы и конструкции
4. Сообщать ориентировочные сроки и стоимость
5. Предлагать вызвать замерщика для точного расчета

Информация о продуктах:
- Стеклянные перегородки: современный вид, пропускают свет, от 25,000 руб.
- Деревянные перегородки: уютные, натуральные, от 35,000 руб. 
- Комбинированные перегородки: стильные, функциональные, от 42,000 руб.

Всегда будь вежливым, профессиональным и заканчивай ответ предложением следующего шага."""

            payload = {
                "model": "GigaChat",
                "messages": [
                    {
                        "role": "system",
                        "content": system_prompt
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ],
                "temperature": 0.7,
                "max_tokens": 500
            }

            response = requests.post(
                url,
                json=payload,
                headers=headers,
                verify=False,
                timeout=30
            )

            print(f"📊 Статус ответа: {response.status_code}")

            if response.status_code == 200:
                result = response.json()
                ai_response = result['choices'][0]['message']['content']
                print("✅ Сообщение успешно отправлено!")
                return ai_response
            else:
                print(f"❌ Ошибка API: {response.status_code}")
                return f"Извините, произошла ошибка при обращении к AI. Статус: {response.status_code}"

        except Exception as e:
            print(f"❌ Ошибка: {e}")
            return f"Извините, произошла ошибка: {str(e)}"

    def create(self, request):
        """Создание новой сессии чата"""
        session_id = str(uuid.uuid4())
        session = ChatSession.objects.create(session_id=session_id)
        serializer = self.get_serializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        """Отправка сообщения AI-помощнику - РАБОЧАЯ ВЕРСИЯ"""
        session = self.get_object()
        user_message = request.data.get('message', '').strip()

        print(f"📨 Получено сообщение: '{user_message}'")

        if not user_message:
            return Response(
                {'error': 'Сообщение не может быть пустым'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Сохраняем сообщение пользователя
        user_msg = ChatMessage.objects.create(
            session=session,
            message=user_message,
            is_user=True
        )

        # Получаем токен и отправляем сообщение
        access_token = self.get_gigachat_token()

        if access_token:
            ai_response = self.send_message_to_gigachat(user_message, access_token)
        else:
            ai_response = "Извините, в данный момент сервис недоступен. Пожалуйста, попробуйте позже."

        # Сохраняем ответ AI
        ai_msg = ChatMessage.objects.create(
            session=session,
            message=ai_response,
            is_user=False,
            ai_response={'response': ai_response}
        )

        return Response({
            'user_message': ChatMessageSerializer(user_msg).data,
            'ai_response': ChatMessageSerializer(ai_msg).data
        })