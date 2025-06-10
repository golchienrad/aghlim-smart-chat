export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatHistory {
  id: string;
  title: string;
  category: 'apartment' | 'villa' | 'office';
  lastMessage: string;
  timestamp: Date;
}