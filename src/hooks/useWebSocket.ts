import { useEffect, useRef, useState, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, type IMessage } from '@stomp/stompjs';
import { formatLocalTime } from '../utils/timeUtils';

const SOCKET_URL = 'http://localhost:8080/ws';

export const useWebSocket = (token?: string | null) => {
  const [connected, setConnected] = useState(false);
  const client = useRef<Client | null>(null);

  // Initialize connection
  useEffect(() => {
    if (!token) {
      // Don't connect if no token
      setConnected(false);
      return;
    }

    const stompClient = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      connectHeaders: {
        'Authorization': `Bearer ${token}` // Add token to connection headers
      },
      debug: (str) => {
        // console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      // console.log('WebSocket connected with authentication');
      setConnected(true);
    };

    stompClient.onDisconnect = () => {
      // console.log('WebSocket disconnected');
      setConnected(false);
    };

    stompClient.onStompError = (frame) => {
      // console.error('STOMP error:', frame);
      if (frame.headers['message']?.includes('Authentication')) {
        // console.error('WebSocket authentication failed');
        setConnected(false);
      }
    };

    stompClient.activate();
    client.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [token]); // Reconnect when token changes

  // Helper function to format timestamp fields in received data
  const formatTimestampFields = (data: any): any => {
    if (!data || typeof data !== 'object') return data;
    
    // Handle arrays
    if (Array.isArray(data)) {
      return data.map(item => formatTimestampFields(item));
    }
    
    // Handle objects
    const formattedData = { ...data };
    
    // Common timestamp field names to format
    const timestampFields = ['createdAt', 'updatedAt', 'timestamp', 'sentAt', 'receivedAt'];
    
    timestampFields.forEach(field => {
      if (formattedData[field]) {
        try {
          // Keep original timestamp for data processing
          formattedData[`${field}_original`] = formattedData[field];
          // Add formatted version for display
          formattedData[`${field}_formatted`] = formatLocalTime(formattedData[field]);
        } catch (error) {
          // console.warn(`Failed to format timestamp field ${field}:`, error);
        }
      }
    });
    
    return formattedData;
  };

  // Subscribe to a topic
  const subscribe = useCallback((destination: string, callback: (message: any) => void) => {
    if (client.current && client.current.connected) {
      return client.current.subscribe(destination, (message: IMessage) => {
        try {
          const parsedMessage = JSON.parse(message.body);
          
          // Format timestamp fields in the received message
          const formattedMessage = formatTimestampFields(parsedMessage);
          
          callback(formattedMessage);
        } catch (error) {
          // console.error('Error parsing WebSocket message:', error);
        }
      }, {
        // Add authorization header to subscription if needed
        'Authorization': token ? `Bearer ${token}` : ''
      });
    }
    return { unsubscribe: () => {} };
  }, [token]);

  // Send a message
  const sendMessage = useCallback((destination: string, body: any) => {
    if (client.current && client.current.connected) {
      // Ensure timestamps are in proper format when sending
      const messageBody = { 
        ...body,
        // Add current timestamp if not present
        createdAt: body.createdAt || new Date().toISOString()
      };
      
      client.current.publish({
        destination,
        body: JSON.stringify(messageBody),
        headers: {
          'Authorization': token ? `Bearer ${token}` : '' // Add token to message headers
        }
      });
      return true;
    }
    return false;
  }, [token]);

  return {
    connected,
    subscribe,
    sendMessage,
    formatLocalTime, // Export the utility function for direct use
  };
};