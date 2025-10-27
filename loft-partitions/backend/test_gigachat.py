import requests
import uuid
import sys
import os

# Добавляем путь к настройкам Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'loft_project.settings')

import django

django.setup()

from django.conf import settings


def test_gigachat_auth():
    """Тестируем авторизацию GigaChat"""
    print("🧪 Testing GigaChat Authentication...")

    api_key = settings.GIGACHAT_API_KEY
    print(f"API Key: {api_key}")
    print(f"Key length: {len(api_key)}")
    print(f"Key starts with: {api_key[:10]}")

    url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
    payload = 'scope=GIGACHAT_API_PERS'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'RqUID': str(uuid.uuid4()),
        'Authorization': f'Basic {api_key}'
    }

    try:
        response = requests.post(url, data=payload, headers=headers, verify=False, timeout=30)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")

        if response.status_code == 200:
            print("🎉 SUCCESS! Authentication works!")
            token_data = response.json()
            print(f"Access Token: {token_data.get('access_token', 'No token')}")
        else:
            print("💥 FAILED! Check your API key and permissions")

    except Exception as e:
        print(f"💥 ERROR: {e}")


if __name__ == "__main__":
    test_gigachat_auth()