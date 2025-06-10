import { motion } from 'framer-motion';
import Header from './Header';
import ChatMessage from './ChatMessage';
import ChatInput from './MessageInput'; // Assuming MessageInput is ChatInput
import AdvertiseDetails from './AdvertiseDetails';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { Message, ChatAreaProps } from '../types/types';
import { chatAreaStyles } from '../utils/styles';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  addMessage,
  isSidebarOpen,
  toggleSidebar,
  advertisementData,
}) => {
  const endRef = useAutoScroll([messages, advertisementData]);
  

 
   
  return (
    <div className={chatAreaStyles.container}>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} startNewChat={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <div className={chatAreaStyles.content}>
        <div className={chatAreaStyles.innerContent}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
          {advertisementData && advertisementData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              {advertisementData.map((ad, index) => (
                <AdvertiseDetails key={index} advertisement={ad} />
              ))}
            </motion.div>
          )}
          <div ref={endRef} />
        </div>
      </div>
      <div className={chatAreaStyles.footer}>
        <div className={chatAreaStyles.footerInner}>
          <ChatInput onSendMessage={(content) => addMessage({ role: 'user', content })} />
          <div className={chatAreaStyles.disclaimer}>
            دستیار املاک ممکن است اشتباه کند. اطلاعات مهم را بررسی کنید.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;