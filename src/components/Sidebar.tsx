import { useState, useRef } from 'react';
import { Search, BookOpen, Zap, X } from 'lucide-react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { SiOpenai } from 'react-icons/si';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { useTheme } from '../context/ThemeContext';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useTouchHover } from '../hooks/useTouchHover';
import { useChatHistory } from '../hooks/useChatHistory';
import ChatHistoryItem from './ChatHistoryItem';
import OptionsDropdown from './OptionsDropdown';
import { SidebarProps, ChatHistory } from '../types/types';
import { sidebarStyles } from '../utils/styles';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, startNewChat }) => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<'recent' | 'saved'>('recent');
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [optionsPosition, setOptionsPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initialHistory: ChatHistory[] = Array.from({ length: 50 }, (_, index) => ({
    id: `${index + 1}`,
    title: `چت آزمایشی ${index + 1}`,
    category: 'chat',
    lastMessage: `پیام آزمایشی برای چت ${index + 1}`,
    timestamp: new Date(),
  }));

  const { filteredHistory, searchTerm, setSearchTerm, addNewChat, deleteChat } = useChatHistory(initialHistory);

  useTouchHover('.sidebar-item');
  useOutsideClick(dropdownRef, () => setShowOptions(null));

  const handleNewChat = () => {
    const newChat = addNewChat();
    startNewChat();
    setActiveItem(newChat.id);
  };

  const handleOptionsClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setOptionsPosition({ top: rect.bottom + 5, left: rect.left - 100 + rect.width / 2 });
    setShowOptions(showOptions === id ? null : id);
  };

  if (!isOpen) return null;

  return (
    <div className={`${sidebarStyles.container} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} id='sideBar_scroll'>
      {/* Logo Header - Sticky */}
      <div className={sidebarStyles.header}>
        <div className="flex items-center gap-2">
          <SiOpenai size={20} className="text-white" />
        </div>
        <button
          onClick={toggleSidebar}
          className="rounded-full p-2 hover:bg-[#2a2b32] transition-colors sidebar-item"
          title={isOpen ? 'بستن سایدبار' : 'باز کردن سایدبار'}
        >
          {isOpen ? <X size={22} className="text-gray-400" /> : <BiMenuAltLeft size={22} className="text-gray-400" />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="p-2 space-y-1">
        <button onClick={handleNewChat} className={sidebarStyles.navButton } >
          <FaRegPenToSquare size={18} className="mr-3 text-gray-400" />
          <span>New chat</span>
        </button>
        <button className={sidebarStyles.navButton}>
          <Search size={18} className="mr-3 text-gray-400" />
          <span>Search chats</span>
        </button>
        <button className={sidebarStyles.navButton}>
          <BookOpen size={18} className="mr-3 text-gray-400" />
          <span>Library</span>
        </button>
        <button className={sidebarStyles.navButton}>
          <div className="w-[18px] h-[18px] mr-3 flex items-center justify-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          </div>
          <span>Sora</span>
        </button>
        <button className={sidebarStyles.navButton}>
          <div className="w-[18px] h-[18px] mr-3 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-gray-400 rounded"></div>
          </div>
          <span>GPTs</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="px-4 py-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در گفتگوها..."
            className={sidebarStyles.searchInput}
          />
        </div>
      </div>

      {/* Chat History Section */}
      <div className={sidebarStyles.historySection}>
        <div className="pb-2">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Chats</span>
        </div>
        <div className="space-y-1">
          {filteredHistory.length === 0 ? (
            <p className="text-sm px-2 text-gray-400">هیچ گفتگویی یافت نشد</p>
          ) : (
            filteredHistory.map((chat) => (
              <ChatHistoryItem
                key={chat.id}
                chat={chat}
                isActive={activeItem === chat.id}
                onSelect={setActiveItem}
                onOptionsClick={handleOptionsClick}
              />
            ))
          )}
        </div>
      </div>

      {/* Options Dropdown */}
      {showOptions && (
        <div ref={dropdownRef}>
          <OptionsDropdown
            chatId={showOptions}
            position={optionsPosition}
            onDelete={deleteChat}
            onClose={() => setShowOptions(null)}
          />
        </div>
      )}

      {/* Sidebar Footer */}
      <div className="p-3">
        <button className={sidebarStyles.footerButton}>
          <div className="flex items-center">
            <Zap size={16} className="mr-2 text-orange-400" />
            <span className="text-sm font-medium">Upgrade plan</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;