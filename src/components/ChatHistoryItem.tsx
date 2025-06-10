import { useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import { ChatHistory } from '../types/types';
import { sidebarStyles } from '../utils/styles';

interface ChatHistoryItemProps {
  chat: ChatHistory;
  isActive: boolean;
  onSelect: (id: string) => void;
  onOptionsClick: (e: React.MouseEvent, id: string) => void;
}

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({ chat, isActive, onSelect, onOptionsClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className={`${sidebarStyles.historyItem} ${isActive ? 'bg-[#2a2b32]' : 'hover:bg-[#2a2b32]'}`}
      onClick={() => onSelect(chat.id)}
    >
      <div className="flex items-center gap-3 text-sm text-white min-w-0 flex-1">
        <div className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0"></div>
        <span className="truncate text-sm">{chat.title}</span>
      </div>
      <button
        ref={buttonRef}
        className={sidebarStyles.optionsButton}
        onClick={(e) => onOptionsClick(e, chat.id)}
      >
        <MoreVertical size={16} className="text-gray-400" />
      </button>
    </div>
  );
};

export default ChatHistoryItem;