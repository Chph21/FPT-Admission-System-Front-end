import { useEffect, useRef, useState, useMemo } from 'react';
import { Menu, ArrowLeft, MessageSquare, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatSidebar from '../../components/ChatBot/ChatSidebar';
import ChatMessage from '../../components/ChatBot/ChatMessage';
import TypingIndicator from '../../components/ChatBot/TypingIndicator';
import ChatInput from '../../components/ChatBot/ChatInput';
import { useChat } from '../../hooks/useChat';

function ChatBotPage() {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const { messages, isTyping, sendMessage, sessions, createNewSession, cancelRequest, connected } = useChat(currentSessionId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [welcomeInput, setWelcomeInput] = useState('');
  
  // Add local state for pending messages
  const [pendingMessages, setPendingMessages] = useState<any[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, pendingMessages]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setPendingMessages([]); // Clear pending messages when switching sessions
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleNewChat = async (firstMessage?: string) => {
    try {
      // Clear any existing pending messages when starting a new chat
      setPendingMessages([]);
      
      if (firstMessage) {
        // Create new session with first message
        const newSessionId = await createNewSession(firstMessage);
        
        if (newSessionId) {
          setCurrentSessionId(newSessionId);
          setIsSidebarOpen(false);
          setWelcomeInput(''); 
          
          // Add the first message as a pending message
          const tempMessage = {
            id: `temp-${Date.now()}`,
            content: firstMessage,
            isUser: true,
            timestamp: 'Vừa xong',
            status: 'SENDING',
            requestId: `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
          };
          
          setPendingMessages([tempMessage]);
          
          // Send the first message immediately
          try {
            await sendMessage(firstMessage, newSessionId);
            
            // Update pending message status to SENT
            setPendingMessages(prev => 
              prev.map(msg => 
                msg.requestId === tempMessage.requestId 
                  ? { ...msg, status: 'SENT' }
                  : msg
              )
            );
          } catch (sendError) {
            console.error('Error sending first message:', sendError);
            setPendingMessages(prev => 
              prev.map(msg => 
                msg.requestId === tempMessage.requestId 
                  ? { ...msg, status: 'ERROR' }
                  : msg
              )
            );
          }
        } else {
          console.error('Failed to create new session');
          setPendingMessages([]);
        }
      } else {
        // If no first message, just create empty session
        const newSessionId = await createNewSession();
        if (newSessionId) {
          setCurrentSessionId(newSessionId);
          setIsSidebarOpen(false);
          setWelcomeInput('');
        }
      }
    } catch (error) {
      console.error('Error in handleNewChat:', error);
      setPendingMessages([]);
    }
  };

  const handleWelcomeKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      if (welcomeInput.trim()) {
        handleWelcomeSubmit(e as any); // Trigger form submission
      }
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentSessionId) {
      // If no current session, create one first
      const newSessionId = await createNewSession();
      
      if (newSessionId) {
        setCurrentSessionId(newSessionId);
        
        // Now send the message to the new session
        const pendingMessage = {
          id: `temp-${Date.now()}`,
          content: content,
          isUser: true,
          timestamp: 'Just now',
          status: 'SENDING',
          requestId: `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        };
        
        setPendingMessages([pendingMessage]);
        
        try {
          await sendMessage(content, newSessionId);
          setPendingMessages(prev => 
            prev.map(msg => 
              msg.requestId === pendingMessage.requestId 
                ? { ...msg, status: 'SENT' }
                : msg
            )
          );
        } catch (sendError) {
          console.error('Error sending message:', sendError);
          setPendingMessages(prev => 
            prev.map(msg => 
              msg.requestId === pendingMessage.requestId 
                ? { ...msg, status: 'ERROR' }
                : msg
            )
          );
        }
      }
    } else {
      // Existing session logic remains the same
      const pendingMessage = {
        id: `temp-${Date.now()}`,
        content: content,
        isUser: true,
        timestamp: 'Just now',
        status: 'SENDING',
        requestId: `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      };
      
      setPendingMessages(prev => [...prev, pendingMessage]);
      
      try {
        await sendMessage(content, currentSessionId);
        setPendingMessages(prev => 
          prev.map(msg => 
            msg.requestId === pendingMessage.requestId 
              ? { ...msg, status: 'SENT' }
              : msg
          )
        );
      } catch (error) {
        console.error('Error sending message:', error);
        setPendingMessages(prev => 
          prev.map(msg => 
            msg.requestId === pendingMessage.requestId 
              ? { ...msg, status: 'ERROR' }
              : msg
          )
        );
      }
    }
  };

  const handleWelcomeInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWelcomeInput(e.target.value);
  };

  const handleWelcomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (welcomeInput.trim()) {
      handleNewChat(welcomeInput.trim());
    }
  };

  // Use useMemo for displayMessages to prevent infinite loops
  const displayMessages = useMemo(() => {
    // Filter out any pending messages that already exist in backend messages
    const filteredPendingMessages = pendingMessages.filter(pendingMsg => {
      return !messages.some(backendMsg => 
        backendMsg.content === pendingMsg.content && 
        backendMsg.isUser === pendingMsg.isUser &&
        (backendMsg.requestId === pendingMsg.requestId || 
         Math.abs(new Date(backendMsg.createdAt).getTime() - parseInt(pendingMsg.id.split('temp-')[1])) < 5000)
      );
    });

    // Combine and sort all messages
    return [...messages, ...filteredPendingMessages].sort((a, b) => {
      // If messages have createdAt timestamps, use those (from backend)
      if (a.createdAt && b.createdAt) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      
      // For pending messages that don't have createdAt, extract timestamp from ID
      const getTimeFromId = (id: string) => {
        if (typeof id === 'string' && id.includes('temp-')) {
          const timestamp = id.split('temp-')[1];
          return parseInt(timestamp, 10);
        }
        return 0;
      };
      
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : getTimeFromId(a.id);
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : getTimeFromId(b.id);
      
      return timeA - timeB;
    });
  }, [messages, pendingMessages]); // This is safe because we're not calling setState

  // Quick start suggestions
  const quickStartSuggestions = [
    "Cho tôi biết về yêu cầu tuyển sinh của Đại học FPT",
    "Đại học FPT có những chương trình học nào?",
    "Làm thế nào để đăng ký học bổng?",
    "Học phí của trường là bao nhiêu?",
    "Hãy cho tôi biết về cơ sở vật chất của trường"
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex overflow-hidden">
      {/* Connection Status */}
      {!connected && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Mất kết nối. Đang kết nối lại...
          </div>
        </div>
      )}
      
      {/* Sidebar */}
      <ChatSidebar
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
        currentSessionId={currentSessionId}
        onSessionSelect={handleSessionSelect}
        onNewChat={() => handleNewChat()}
        sessions={sessions}
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Enhanced Header */}
        <div className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleSidebar}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Back to Home Button */}
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline text-sm font-medium">Về trang chủ</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h2 className="text-lg font-semibold text-gray-900">Trợ lý AI FPT</h2>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500">Trực tuyến & Sẵn sàng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Messages container or Welcome Screen */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {currentSessionId || pendingMessages.length > 0 ? (
            /* Chat Messages */
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
              <div className="max-w-4xl mx-auto">
                {displayMessages.map((message, index) => (
                  <div
                    key={`${message.id || message.requestId || index}-${index}`}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ChatMessage
                      message={message.content}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                      status={message.status}
                      onCancel={
                        message.isUser && message.status === 'SENDING' && isTyping ? 
                        () => cancelRequest(currentSessionId!, message.requestId || '') : 
                        undefined
                      }
                    />
                  </div>
                ))}
                
                {isTyping && <TypingIndicator isVisible={true} />}
                
                {/* This empty div ensures we always scroll to the bottom */}
                <div ref={messagesEndRef} />
              </div>
            </div>
          ) : (
            /* Enhanced Welcome Screen */
            <div className="flex-1 flex items-center justify-center px-4 py-8">
              <div className="text-center max-w-2xl mx-auto">
                {/* Hero Section */}
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Chào mừng đến với Trợ lý AI FPT
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Người bạn đồng hành thông minh cho việc tuyển sinh Đại học FPT. Hỏi bất cứ điều gì về chương trình, yêu cầu, học bổng và nhiều hơn nữa!
                  </p>
                </div>

                {/* Quick Start Input */}
                <div className="mb-8">
                  <form onSubmit={handleWelcomeSubmit} className="mb-6">
                    <div className="relative">
                      <textarea
                        value={welcomeInput}
                        onChange={handleWelcomeInputChange}
                        onKeyDown={handleWelcomeKeyDown}
                        placeholder="Hỏi tôi bất cứ điều gì về Đại học FPT..."
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-gray-900 bg-white/80 backdrop-blur-sm shadow-lg placeholder-gray-500 transition-all duration-200"
                        rows={3}
                      />
                      <button 
                        type="submit"
                        disabled={!welcomeInput.trim()}
                        className="absolute bottom-3 right-3 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        Bắt đầu trò chuyện
                      </button>
                    </div>
                  </form>
                </div>

                {/* Quick Start Suggestions */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Gợi ý bắt đầu nhanh</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {quickStartSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleNewChat(suggestion)}
                        className="p-4 text-left bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:shadow-lg hover:border-orange-200 transition-all duration-200 group"
                      >
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 text-orange-500 mt-0.5 group-hover:scale-110 transition-transform" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Alternative Action */}
                <div className="border-t border-gray-200 pt-6">
                  <button 
                    onClick={() => handleNewChat()}
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium hover:bg-orange-50 px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Bắt đầu với cuộc trò chuyện trống
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Enhanced Input - Fixed at bottom */}
          {(currentSessionId || pendingMessages.length > 0) && (
            <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
              <ChatInput onSendMessage={handleSendMessage} disabled={isTyping || !connected} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatBotPage;