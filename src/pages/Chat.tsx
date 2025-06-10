import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import ChatInterface from '../components/ChatInterface';

const Chat = () => {
  return (
    <ThemeProvider>
      <ChatInterface />
    </ThemeProvider>
  );
};

export default Chat;