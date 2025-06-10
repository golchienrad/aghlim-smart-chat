import { QuickAction } from '../types/types';
import { chatInputStyles } from '../utils/styles';

interface QuickActionButtonProps {
  action: QuickAction;
  onClick: (text: string) => void;
  isDropdown?: boolean;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ action, onClick, isDropdown = false }) => (
  <button
    className={isDropdown ? chatInputStyles.dropdownItem : chatInputStyles.quickButton}
    onClick={() => onClick(action.text)}
  >
    {action.icon}
    <span className={isDropdown ? 'flex-1 text-right' : ''}>{action.text}</span>
    {action.extra && isDropdown && <span className="text-xs text-gray-500">{action.extra}</span>}
  </button>
);

export default QuickActionButton;