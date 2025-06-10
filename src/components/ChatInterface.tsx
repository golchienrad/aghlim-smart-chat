import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import { useChatApi } from '../hooks/useChatApi';
import { Message } from '../types/types';

const ChatInterface: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const { sendMessage } = useChatApi(setMessages);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} startNewChat={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <ChatArea
        messages={messages}
        addMessage={sendMessage}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default ChatInterface;