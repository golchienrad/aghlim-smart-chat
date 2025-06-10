import { useMemo } from 'react';
import {
  Star,
  Settings,
  Keyboard,
  Flag,
  HelpCircle,
  Download,
  LogOut,
} from 'lucide-react';
import { Profile, MenuProps } from '../types/types';

interface ProfileMenuProps extends MenuProps {
  profile: Profile;
  openSettings: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ profile, onToggle, isOpen, openSettings }) => {
  const menuItems = useMemo(
    () => [
      { icon: Star, label: 'Upgrade Plan', size: 26 },
      { icon: Settings, label: 'Customize ChatGPT', size: 26 },
      { icon: Settings, label: 'Settings', size: 16, onClick: openSettings },
      { icon: Keyboard, label: 'Keyboard shortcuts', size: 16 },
      { icon: Flag, label: 'Report Illegal Content', size: 16 },
      { icon: HelpCircle, label: 'Help & FAQ', size: 16 },
      { icon: Download, label: 'Release notes', size: 16 },
      { icon: Download, label: 'Terms & policies', size: 16 },
      { icon: Download, label: 'Get ChatGPT search extension', size: 16 },
    ],
    [openSettings]
  );

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-500 transition-colors"
        aria-label="Profile menu"
      >
        {profile.imageUrl ? (
          <img
            src={profile.imageUrl}
            alt="تصویر پروفایل"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-medium">
            {profile.name.charAt(0) || 'ک'}
          </div>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-10 w-64 bg-[#303030] rounded-xl shadow-lg py-2 z-50">
          <div className="px-4 py-3">
            <div className="text-white text-sm font-medium">{profile.email}</div>
          </div>
          <div className="py-1">
            {menuItems.map(({ icon: Icon, label, size, onClick }, index) => (
              <button
                key={index}
                onClick={onClick}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                aria-label={label}
              >
                <Icon size={size} />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="pt-1">
            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
              aria-label="Log out"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;