import { sidebarStyles } from '../utils/styles';

interface OptionsDropdownProps {
  chatId: string;
  position: { top: number; left: number };
  onDelete: (id: string) => void;
  onClose: () => void;
}

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({ chatId, position, onDelete, onClose }) => (
  <div className={sidebarStyles.dropdown} style={{ top: position.top, left: position.left }}>
    <button className={sidebarStyles.dropdownItem}>Share</button>
    <button className={sidebarStyles.dropdownItem}>Rename</button>
    <button className={sidebarStyles.dropdownItem}>Archive</button>
    <div className="h-px bg-gray-700 my-1"></div>
    <button className={`${sidebarStyles.dropdownItem} text-red-400`} onClick={() => { onDelete(chatId); onClose(); }}>
      Delete
    </button>
  </div>
);

export default OptionsDropdown;