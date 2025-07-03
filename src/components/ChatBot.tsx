import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial welcome message
      const welcomeMessage: Message = {
        id: '1',
        text: "Hi! I'm FundiBot 🤖 Welcome to Kenya's premier platform for finding skilled professionals! How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const botResponses = {
    greetings: [
      "Hello! How can I help you find a service provider today?",
      "Hi there! What service are you looking for?",
      "Welcome to FundiBot! I'm here to help you connect with skilled professionals."
    ],
    services: {
      plumbing: "Great! I can help you find plumbers. We have 120+ verified plumbers across Kenya. Would you like me to show you plumbers in your area?",
      electrical: "Perfect! We have 90+ certified electricians ready to help. What type of electrical work do you need?",
      tutoring: "Excellent! We have 80+ qualified tutors for various subjects. What subject do you need help with?",
      cleaning: "Wonderful! We have 150+ professional cleaners. Do you need residential or commercial cleaning?",
      painting: "Great choice! We have 65+ skilled painters. Are you looking for interior or exterior painting?",
      beauty: "Perfect! We have 70+ beauty professionals. What type of beauty service are you interested in?",
      auto: "Excellent! We have 45+ auto repair specialists. What kind of vehicle issue do you have?",
      tech: "Great! We have 55+ tech support experts. What technical issue can we help you with?"
    },
    locations: "I can help you find providers in major Kenyan cities including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and many more. Which city are you in?",
    booking: "To book a service, I'll need to know: 1) What service you need 2) Your location 3) Preferred date and time. Would you like to start with telling me what service you need?",
    pricing: "Our pricing varies by service and provider. Most services range from KES 1,200-3,000 per hour. Each provider sets their own rates, and you can compare prices before booking.",
    emergency: "For emergency services, we have providers available 24/7. What type of emergency service do you need? I can connect you with available providers immediately.",
    default: "I understand you're looking for help. I can assist you with finding service providers, booking appointments, or answering questions about our services. What would you like to know?"
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    }
    
    // Services
    if (message.includes('plumb')) return botResponses.services.plumbing;
    if (message.includes('electric')) return botResponses.services.electrical;
    if (message.includes('tutor') || message.includes('teach')) return botResponses.services.tutoring;
    if (message.includes('clean')) return botResponses.services.cleaning;
    if (message.includes('paint')) return botResponses.services.painting;
    if (message.includes('beauty') || message.includes('makeup') || message.includes('hair')) return botResponses.services.beauty;
    if (message.includes('auto') || message.includes('car') || message.includes('vehicle')) return botResponses.services.auto;
    if (message.includes('tech') || message.includes('computer') || message.includes('laptop')) return botResponses.services.tech;
    
    // Location
    if (message.includes('location') || message.includes('where') || message.includes('city')) {
      return botResponses.locations;
    }
    
    // Booking
    if (message.includes('book') || message.includes('appointment') || message.includes('schedule')) {
      return botResponses.booking;
    }
    
    // Pricing
    if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('rate')) {
      return botResponses.pricing;
    }
    
    // Emergency
    if (message.includes('emergency') || message.includes('urgent') || message.includes('asap')) {
      return botResponses.emergency;
    }
    
    // Services list
    if (message.includes('service') && (message.includes('what') || message.includes('list') || message.includes('available'))) {
      return "We offer these services: Plumbing, Electrical, Tutoring, Cleaning, Painting, Beauty, Auto Repair, Tech Support, Photography, Carpentry, Gardening, Healthcare, Childcare, and Pet Care. Which one interests you?";
    }
    
    // WhatsApp redirect
    if (message.includes('whatsapp') || message.includes('chat') || message.includes('talk')) {
      return "For direct communication with providers, I can connect you via WhatsApp! Would you like me to help you find a provider first, or do you want to chat with our support team directly?";
    }
    
    return botResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Find a plumber",
    "Book cleaning service",
    "Get a tutor",
    "Emergency repair",
    "View all services"
  ];

  const handleQuickAction = (action: string) => {
    setInputText(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleConnectWhatsApp = () => {
    const message = "Hi! I was chatting with FundiBot and would like to continue our conversation here. Can you help me find a service provider?";
    const whatsappUrl = `https://wa.me/254768375519?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="bg-primary-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">FundiBot</h3>
              <p className="text-sm opacity-90">Online now</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`p-3 rounded-2xl ${message.sender === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl">
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

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* WhatsApp Connect Button */}
        <div className="px-4 pb-2">
          <button
            onClick={handleConnectWhatsApp}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center justify-center"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Continue on WhatsApp
          </button>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-primary-500 text-white p-3 rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;