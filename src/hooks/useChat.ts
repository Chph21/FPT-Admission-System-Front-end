import { useState, useEffect, useCallback, useRef } from 'react';
import { ROLES, type ChatUIMessage, type ChatSessionUI } from '../types/chatTypes';
import { useWebSocket } from './useWebSocket';
import { useAppSelector } from '../store/hooks';
import axios from 'axios';
import { formatLocalTime, formatRelativeTime } from '../utils/timeUtils';

const API_URL = 'http://localhost:8080/api/chatboxes';

export const useChat = (sessionId?: string | null) => {
  const [messages, setMessages] = useState<ChatUIMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState<ChatSessionUI[]>([]);
  
  // Get token from Redux store
  const { token } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth);
  
  const { connected, subscribe, sendMessage } = useWebSocket(token); // Pass token to WebSocket
  const subscriptions = useRef<any[]>([]);

  // Create axios instance with auth header
  const axiosWithAuth = useCallback(() => {
    return axios.create({
      baseURL: API_URL,
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
  }, [token]);

  // Load sessions
  useEffect(() => {
    if (!token) return; // Don't fetch if no token
    
    const fetchSessions = async () => {
      try {
        const api = axiosWithAuth();
        const response = await api.get('/sessions/' + (user?.id ? `${user.id}` : ''));
        const sessionsData = response.data.map((session: any) => ({
          id: session.id,
          title: session.title,
          createdAt: session.createdAt,
          lastMessage: '...',
          timestamp: formatRelativeTime(session.createdAt) // Use utility function
        }));
        setSessions(sessionsData);
      } catch (error) {
        console.error('Lỗi khi lấy phiên:', error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            console.error('Không có quyền: Token không hợp lệ hoặc đã hết hạn');
          }
        }
      }
    };

    fetchSessions();

    // Subscribe to sessions updates
    if (connected) {
      const subscription = subscribe('/topic/sessions', (updatedSession) => {
        console.log('📥 Received session update via WebSocket:', updatedSession);
        console.log('📝 Session title:', updatedSession.title);
        
        setSessions(prev => {
          const exists = prev.some(s => s.id === updatedSession.id);
          
          if (exists) {
            console.log('🔄 Updating existing session title');
            return prev.map(s => s.id === updatedSession.id ? { 
              ...s, 
              title: updatedSession.title || s.title,
              lastMessage: updatedSession.lastMessage || s.lastMessage,
              timestamp: formatRelativeTime(updatedSession.createdAt || s.createdAt) // Use utility function
            } : s);
          } else {
            console.log('➕ Adding new session');
            return [{
              id: updatedSession.id,
              title: updatedSession.title || 'Cuộc trò chuyện mới',
              createdAt: updatedSession.createdAt,
              lastMessage: updatedSession.lastMessage || 'Cuộc trò chuyện mới',
              timestamp: formatRelativeTime(updatedSession.createdAt) // Use utility function
            }, ...prev];
          }
        });
      });
      
      subscriptions.current.push(subscription);
    }

    return () => {
      subscriptions.current.forEach(sub => sub.unsubscribe());
      subscriptions.current = [];
    };
  }, [connected, subscribe, token, axiosWithAuth]);

  // Load messages for the selected session
  useEffect(() => {
    if (!sessionId || !token) {
      setMessages([]);
      return;
    }

    // Fetch existing messages
    const fetchMessages = async () => {
      try {
        const api = axiosWithAuth();
        const response = await api.get(`/sessions/${sessionId}/messages`);
        const messagesData = response.data.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          createdAt: msg.createdAt,
          status: msg.status || 'DELIVERED',
          isUser: msg.role === ROLES.USER,
          timestamp: formatLocalTime(msg.createdAt), // Use utility function
          requestId: msg.requestId
        }));
        setMessages(messagesData);
      } catch (error) {
        console.error('Lỗi khi lấy tin nhắn:', error);
      }
    };

    fetchMessages();

    // Subscribe to message updates for this session
    if (connected) {
      const subscription = subscribe(`/topic/chat/${sessionId}`, (newMessage) => {
        console.log('📥 Received message update:', newMessage);
        
        // Update typing indicator based on message status
        if (newMessage.role === ROLES.BOT && newMessage.status === 'COMPLETED') {
          setIsTyping(false);
        } else if (newMessage.status === 'PROCESSING') {
          setIsTyping(true);
          return; // Don't add processing messages to chat
        }

        // Handle all message updates including status changes
        if (newMessage.content) {
          setMessages(prev => {
            // Check if message already exists by ID or requestId
            const existingIndex = prev.findIndex(m => 
              m.id === newMessage.id || 
              (m.requestId && newMessage.requestId && m.requestId === newMessage.requestId)
            );
            
            if (existingIndex !== -1) {
              // Update existing message with new status
              const updatedMessages = [...prev];
              updatedMessages[existingIndex] = {
                ...updatedMessages[existingIndex], // Keep existing data
                ...newMessage, // Merge new data
                isUser: newMessage.role === ROLES.USER,
                timestamp: new Date(newMessage.createdAt || updatedMessages[existingIndex].createdAt).toLocaleString()
              };
              return updatedMessages;
            } else {
              // Add new message (both user and bot messages)
              const newMsg = {
                ...newMessage,
                isUser: newMessage.role === ROLES.USER,
                timestamp: formatLocalTime(newMessage.createdAt || new Date()) // Use utility function
              };
              return [...prev, newMsg];
            }
          });

          // Update session list with latest message (for both user and bot messages)
          setSessions(prev => 
            prev.map(session => 
              session.id === sessionId 
                ? { 
                    ...session, 
                    lastMessage: newMessage.content.substring(0, 50) + (newMessage.content.length > 50 ? '...' : ''),
                    timestamp: formatRelativeTime(newMessage.createdAt || new Date()) // Use utility function
                  } 
                : session
            ).sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          );
        }
      });
      
      subscriptions.current.push(subscription);
    }

    return () => {
      subscriptions.current.forEach(sub => sub.unsubscribe());
      subscriptions.current = [];
    };
  }, [sessionId, connected, subscribe, token, axiosWithAuth]);

  const sendChatMessage = useCallback((content: string, currentSessionId?: string | null) => {
    if (!currentSessionId || !token) return;
    
    // Don't set typing here - let the WebSocket response handle it
    
    // Create the message object
    const messageDTO = {
      role: ROLES.USER,
      content,
      sessionId: currentSessionId,
      createdAt: new Date().toISOString(),
      requestId: `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    };
    
    // Send via WebSocket if connected, otherwise use REST API
    if (connected) {
      sendMessage('/app/chat.sendMessage', messageDTO);
    } else {
      const api = axiosWithAuth();
      api.post('/message', messageDTO)
        .catch(error => console.error('Lỗi khi gửi tin nhắn:', error));
    }
  }, [connected, sendMessage, token, axiosWithAuth]);

  const createNewSession = useCallback(async (firstMessage?: string) => {
    if (!token) return null;
    
    try {
      const newSession = {
        title: 'Cuộc trò chuyện mới',
        userId: (user?.id || ''),
        createdAt: new Date().toISOString(),
        firstMessage: firstMessage
      };
      
      const api = axiosWithAuth();
      const response = await api.post('/session', newSession);
      const createdSession = response.data;

      // Add new session to sidebar immediately
      setSessions(prev => {
        const exists = prev.some(s => s.id === createdSession.id);
        if (!exists) {
          const newSessionUI = {
            id: createdSession.id,
            title: createdSession.title || 'Cuộc trò chuyện mới',
            createdAt: createdSession.createdAt,
            lastMessage: firstMessage || 'Cuộc trò chuyện mới',
            timestamp: formatRelativeTime(createdSession.createdAt) // Use utility function
          };
          
          return [newSessionUI, ...prev].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return prev;
      });
      
      // Poll for title updates if firstMessage was provided
      if (firstMessage) {
        const pollForTitleUpdate = async (attempts = 0) => {
          if (attempts >= 10) return; // Stop after 10 attempts (50 seconds)
          
          try {
            const titleResponse = await api.get(`/sessions/${createdSession.id}`);
            const sessionData = titleResponse.data;
            
            // If title has changed from default, update it
            if (sessionData.title && sessionData.title !== 'Cuộc trò chuyện mới') {
              console.log('📝 Title updated from API:', sessionData.title);
              setSessions(prev => prev.map(session => 
                session.id === createdSession.id 
                  ? { ...session, title: sessionData.title }
                  : session
              ));
              return; // Stop polling once we get a real title
            }
            
            // Continue polling
            setTimeout(() => pollForTitleUpdate(attempts + 1), 5000);
          } catch (error) {
            console.error('Error checking for title update:', error);
          }
        };
        
        // Start polling after a short delay
        setTimeout(() => pollForTitleUpdate(), 3000);
      }
      
      return createdSession.id;
    } catch (error) {
      console.error('Lỗi khi tạo phiên:', error);
      return null;
    }
  }, [token, axiosWithAuth, user?.id]);

  const cancelRequest = useCallback((sessionId: string, requestId: string) => {
    if (!token) return;
    
    const api = axiosWithAuth();
    api.delete(`/message/${sessionId}/cancel/${requestId}`)
      .catch(error => console.error('Lỗi khi hủy yêu cầu:', error));
  }, [token, axiosWithAuth]);

  return { 
    messages, 
    isTyping, 
    sendMessage: sendChatMessage, 
    sessions, 
    createNewSession,
    cancelRequest,
    connected
  };
};