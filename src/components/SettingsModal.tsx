// src/components/SettingsModal.tsx
import { useTheme } from '../context/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-all"
            aria-label="Close settings"
          >
            <span className="text-lg">✕</span>
          </button>
        </div>
        <div className="p-6 space-y-6">
          {[
            {
              label: 'Dark mode',
              subLabel: 'Toggle dark theme',
              onClick: toggleTheme,
              isActive: theme === 'dark',
            },
            {
              label: 'Notifications',
              subLabel: 'Receive system notifications',
              isActive: false,
            },
            {
              label: 'Auto-save',
              subLabel: 'Automatically save conversations',
              isActive: true,
            },
          ].map(({ label, subLabel, onClick, isActive }, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-white font-medium">{label}</span>
                <span className="text-sm text-gray-400">{subLabel}</span>
              </div>
              <button
                onClick={onClick}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                  isActive ? 'bg-blue-600' : 'bg-gray-600'
                }`}
                aria-label={label}
              >
                <span
                  className={`inline-block w-4 h-4 transform rounded-full bg-white shadow-lg transition-transform ${
                    isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;