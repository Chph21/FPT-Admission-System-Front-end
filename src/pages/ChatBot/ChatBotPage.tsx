import React, { useEffect, useRef } from 'react';
import ChatHeader from '../../components/ChatBot/ChatHeader';
import ChatMessage from '../../components/ChatBot/ChatMessage';
import TypingIndicator from '../../components/ChatBot/TypingIndicator';
import ChatInput from '../../components/ChatBot/ChatInput';
import { useChat } from '../../hooks/useChat';

function ChatBotPage() {
  const { messages, isTyping, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header - Fixed height */}
      <ChatHeader />
      
      {/* Messages container - Scrollable, takes remaining height */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-6">
          <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ChatMessage
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              </div>
            ))}
            
            {isTyping && <TypingIndicator isVisible={true} />}
            
            {/* This empty div ensures we always scroll to the bottom */}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input - Fixed at bottom */}
        <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}

export default ChatBotPage;