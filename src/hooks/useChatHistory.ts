import { useState, useEffect } from 'react';
import { ChatHistory } from '../types/types';

export const useChatHistory = (initialHistory: ChatHistory[] = []) => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(
        JSON.parse(savedHistory).map((item: ChatHistory) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }))
      );
    } else {
      setChatHistory(initialHistory);
      localStorage.setItem('chatHistory', JSON.stringify(initialHistory));
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const filteredHistory = chatHistory.filter(
    (chat) => chat.title.includes(searchTerm) || chat.lastMessage.includes(searchTerm)
  );

  const addNewChat = () => {
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      title: `New chat`,
      category: 'chat',
      lastMessage: 'شروع یک گفتگوی جدید',
      timestamp: new Date(),
    };
    setChatHistory([newChat, ...chatHistory]);
    return newChat;
  };

  const deleteChat = (id: string) => {
    setChatHistory(chatHistory.filter((chat) => chat.id !== id));
  };

  return {
    chatHistory,
    setChatHistory,
    filteredHistory,
    searchTerm,
    setSearchTerm,
    addNewChat,
    deleteChat,
  };
};