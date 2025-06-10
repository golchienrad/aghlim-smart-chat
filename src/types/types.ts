export interface Profile {
  name: string;
  email: string;
  imageUrl: string | null;
}

export interface MenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  startNewChat: () => void;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  startNewChat: () => void;
}

export interface ChatAreaProps {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  advertisementData?: Advertisement[];
}

export interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

export interface QuickAction {
  icon: React.ReactNode;
  text: string;
  extra?: string;
}

export interface ChatHistory {
  id: string;
  title: string;
  category: string;
  lastMessage: string;
  timestamp: Date;
}

export interface Advertisement {
  AdvertiseGroupName: string;
  Title: string;
  Description: string;
  WHERE_Value: string;
  advertiseCode: string;
  Images: { url: string }[];
  Specification: string;
  PriceValue: string;
  CreatedDatetime: string;
  Location: { Latitude: number; Longitude: number };
}

export interface SpeechRecognitionEvent {
  resultIndex: number;
  results: { [key: number]: { [key: number]: { transcript: string } } & { isFinal: boolean } };
}

export interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: { error: string }) => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}