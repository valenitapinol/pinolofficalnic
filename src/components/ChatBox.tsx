import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'driver' | 'restaurant';
  text: string;
  time: string;
}

const mockMessages: Message[] = [
  { id: 1, sender: 'restaurant', text: '✅ Tu pedido está siendo preparado', time: '14:32' },
  { id: 2, sender: 'driver', text: 'Hola, soy Joel. Voy en camino 🚗', time: '14:35' },
  { id: 3, sender: 'driver', text: '📍 Estoy a 5 minutos de tu casa', time: '14:37' },
];

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage,
        time: new Date().toLocaleTimeString('es-NI', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simular respuesta del driver
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          sender: 'driver',
          text: '👍 Entendido, llegaré en breve',
          time: new Date().toLocaleTimeString('es-NI', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, response]);
      }, 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b">
        <MessageCircle className="w-5 h-5 text-red-600" />
        <h3 className="font-bold">Chat en vivo</h3>
      </div>

      {/* Mensajes */}
      <div className="space-y-3 mb-3 max-h-64 overflow-y-auto bg-gray-50 p-3 rounded-lg">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.sender === 'user'
                  ? 'bg-red-600 text-white rounded-br-none'
                  : msg.sender === 'driver'
                  ? 'bg-blue-100 text-gray-800 rounded-bl-none'
                  : 'bg-green-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-red-100' : 'text-gray-500'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Escribe un mensaje..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={handleSendMessage}
          className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center gap-1"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
