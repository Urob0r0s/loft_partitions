import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X } from 'lucide-react';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Авто-скролл к новым сообщениям
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Создание новой сессии чата
  const createChatSession = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/ai/chat-sessions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSessionId(data.id);

      // Приветственное сообщение
      setMessages([{
        id: 1,
        message: 'Привет! Я AI-консультант по лофт перегородкам. Расскажите о вашем помещении, и я помогу подобрать идеальный вариант!',
        is_user: false,
        created_at: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error creating chat session:', error);
    }
  };

  // Отправка сообщения
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !sessionId) return;

    const userMessage = {
      id: Date.now(),
      message: inputMessage,
      is_user: true,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/api/ai/chat-sessions/${sessionId}/send_message/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      if (data.ai_response) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          message: data.ai_response.message,
          is_user: false,
          created_at: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        message: 'Извините, произошла ошибка. Пожалуйста, попробуйте позже.',
        is_user: false,
        created_at: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Открытие чата
  const handleOpenChat = () => {
    setIsOpen(true);
    if (!sessionId) {
      createChatSession();
    }
  };

  // Закрытие чата
  const handleCloseChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Кнопка открытия чата */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300"
        >
          <Bot size={24} />
        </button>
      )}

      {/* Окно чата */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col border border-gray-200">
          {/* Хедер чата */}
          <div className="bg-blue-900 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <span className="font-semibold">AI Консультант</span>
            </div>
            <button
              onClick={handleCloseChat}
              className="text-white hover:text-gray-200 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Область сообщений */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 ${msg.is_user ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-flex items-start space-x-2 max-w-[80%] ${
                    msg.is_user ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.is_user ? 'bg-red-600' : 'bg-blue-600'
                    } text-white`}
                  >
                    {msg.is_user ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      msg.is_user
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-flex items-start space-x-2 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white">
                    <Bot size={16} />
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Форма ввода */}
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Задайте вопрос о перегородках..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;