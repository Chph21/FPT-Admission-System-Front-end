import React, { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import ChatHeader from '../../components/ChatBot/ChatHeader';
import ChatSidebar from '../../components/ChatBot/ChatSidebar';
import ChatMessage from '../../components/ChatBot/ChatMessage';
import TypingIndicator from '../../components/ChatBot/TypingIndicator';
import ChatInput from '../../components/ChatBot/ChatInput';
import { useChat } from '../../hooks/useChat';

function ChatBotPage() {
  const { messages, isTyping, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState('1');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    // Here you would typically load the messages for the selected session
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleNewChat = () => {
    // Here you would typically create a new chat session
    const newSessionId = Date.now().toString();
    setCurrentSessionId(newSessionId);
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
        currentSessionId={currentSessionId}
        onSessionSelect={handleSessionSelect}
        onNewChat={handleNewChat}
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with menu button */}
        <div className="relative">
          <button
            onClick={handleToggleSidebar}
            className="lg:hidden absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>
          <ChatHeader />
        </div>
        
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
    </div>
  );
}

export default ChatBotPage;