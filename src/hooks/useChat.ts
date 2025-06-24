import { useState, useCallback } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm your AI assistant. How can I help you today?",
    isUser: false,
    timestamp: '10:00 AM'
  },
  {
    id: '2',
    text: "Hi there! I'd like to know more about web development best practices.",
    isUser: true,
    timestamp: '10:01 AM'
  },
  {
    id: '3',
    text: "Great question! Web development best practices include writing clean, maintainable code, following responsive design principles, optimizing for performance, ensuring accessibility, and implementing proper security measures. Would you like me to elaborate on any specific area?",
    isUser: false,
    timestamp: '10:01 AM'
  },
  {
    id: '4',
    text: "Hi there! I'd like to know more about web development best practices.",
    isUser: true,
    timestamp: '10:01 AM'
  },
  {
    id: '5',
    text: "Hi there! I'd like to know more about web development best practices.",
    isUser: true,
    timestamp: '10:01 AM'
  },
  {
    id: '6',
    text: "Hi there! I'd like to know more about web development best practices.",
    isUser: true,
    timestamp: '10:01 AM'
  },
  {
    id: '7',
    text: "Hi there! I'd like to know more about web development best practices.",
    isUser: true,
    timestamp: '10:01 AM'
  },
  {
    id: '8',
    text: "Hi there! I'd like to know more about web development best practices.",
    isUser: true,
    timestamp: '10:01 AM'
  },
  {
    id: '9',
    text: "Hi there! I'd like to know more about web development best practices.",
    isUser: true,
    timestamp: '10:01 AM'
  }
];

// Simulated AI responses
const aiResponses = [
  "That's an interesting question! Let me think about that for a moment.",
  "I'd be happy to help you with that. Here's what I know about this topic.",
  "Great point! There are several ways to approach this problem.",
  "I understand what you're asking. Let me provide you with a comprehensive answer.",
  "That's a common question, and I'm glad you asked! Here's my take on it.",
  "Excellent question! This is actually something many people wonder about.",
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback((text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage
  };
}