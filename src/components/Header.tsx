import React, { useEffect, useState } from "react";
import {
  Share2,
  Settings,
  HelpCircle,
  Download,
  Flag,
  ChevronDown,
  Sparkles,
  Star,
  Keyboard,
  LogOut,
} from "lucide-react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaRegPenToSquare } from "react-icons/fa6";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  startNewChat: () => void;
}

interface Profile {
  name: string;
  email: string;
  imageUrl: string | null;
}

const ModelMenu: React.FC<{ onToggle: () => void; isOpen: boolean }> = ({
  onToggle,
  isOpen,
}) => (
  <div className="relative">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white transition-colors"
    >
      <span className="text-lg font-medium">ChatGPT</span>
      <ChevronDown size={26} className="text-gray-400" />
    </button>
    {isOpen && (
      <div className="absolute top-10 left-0 w-80 px-3 py-2 bg-[#303030] rounded-xl shadow-lg z-50">
        <div className="py-2">
          <div className="flex items-center gap-2 p-3 rounded-lg">
            <Sparkles size={26} className="text-purple-400" />
            <div className="flex-1">
              <div className="text-white font-medium text-sm">ChatGPT Plus</div>
              <div className="text-gray-400 text-xs">Our smartest model & more</div>
            </div>
            <button className="px-3 py-1 text-xs bg-white text-gray-900 font-medium rounded-md">
              Upgrade
            </button>
          </div>
        </div>
        <div className="py-1">
          <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">ChatGPT</div>
              <div className="text-gray-400 text-xs">Great for everyday tasks</div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

const ProfileMenu: React.FC<{ profile: Profile; onToggle: () => void; isOpen: boolean; openSettings: () => void }> = ({
  profile,
  onToggle,
  isOpen,
  openSettings,
}) => (
  <div className="relative">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-500 transition-colors">
      {profile.imageUrl ? (
        <img src={profile.imageUrl} alt="تصویر پروفایل" className="w-8 h-8 rounded-full object-cover" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-medium">
          {profile.name.charAt(0) || "ک"}
        </div>
      )}
    </button>
    {isOpen && (
      <div className="absolute right-0 top-10 w-64 bg-[#303030] rounded-xl shadow-lg py-2 z-50">
        <div className="px-4 py-3">
          <div className="text-white text-sm font-medium">{profile.email}</div>
        </div>
        <div className="py-1">
          {[
            { icon: Star, label: "Upgrade Plan", size: 26 },
            { icon: Settings, label: "Customize ChatGPT", size: 26 },
            { icon: Settings, label: "Settings", size: 16, onClick: openSettings },
            { icon: Keyboard, label: "Keyboard shortcuts", size: 16 },
            { icon: Flag, label: "Report Illegal Content", size: 16 },
            { icon: HelpCircle, label: "Help & FAQ", size: 16 },
            { icon: Download, label: "Release notes", size: 16 },
            { icon: Download, label: "Terms & policies", size: 16 },
            { icon: Download, label: "Get ChatGPT search extension", size: 16 },
          ].map(({ icon: Icon, label, size, onClick }, index) => (
            <button
              key={index}
              onClick={onClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <Icon size={size} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="pt-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    )}
  </div>
);

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar, startNewChat }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [profile] = useState<Profile>({
    name: "کاربر",
    email: "user@example.com",
    imageUrl: null,
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const handleClickOutside = (event: MouseEvent) => {
      if (showProfileMenu || showModelMenu) {
        setShowProfileMenu(false);
        setShowModelMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showProfileMenu, showModelMenu]);

  return (
    <header className={`bg-gray-50 dark:bg-[#212121] border-b dark:border-gray-700 border-gray-200 sticky top-0 z-20 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
      <div className="flex items-center justify-between px-3 py-2 max-w-full mx-auto">
        {/* Left section */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-12 h-10 rounded-full text-gray-300 hover:bg-gray-500 transition-colors"
            title={isSidebarOpen ? "بستن منو" : "باز کردن منو"}
          >
            <BiMenuAltLeft size={26} />
          </button>
          <ModelMenu onToggle={() => setShowModelMenu(!showModelMenu)} isOpen={showModelMenu} />
        </div>

        {/* Center section */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center">
          <button className="flex items-center gap-2 px-2 py-1 bg-white text-gray-900 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors">
            <Sparkles size={26} />
            <span>Get Plus</span>
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-300 hover:bg-gray-500 transition-colors">
              <Share2 size={26} />
            </button>
            <ProfileMenu
              profile={profile}
              onToggle={() => setShowProfileMenu(!showProfileMenu)}
              isOpen={showProfileMenu}
              openSettings={() => {
                setShowSettings(true);
                setShowProfileMenu(false);
              }}
            />
          </div>
          {!isSidebarOpen && (
            <button
              onClick={startNewChat}
              className="flex items-center justify-center w-12 h-10 rounded-lg text-gray-300 hover:bg-gray-500 transition-colors block md:hidden"
              title="چت جدید"
            >
              <FaRegPenToSquare size={26} />
            </button>
          )}
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6">
              <h2 className="text-xl font-semibold text-white">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-all"
              >
                <span className="text-lg">✕</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {[
                {
                  label: "Dark mode",
                  subLabel: "Toggle dark theme",
                  onClick: toggleTheme,
                  isActive: theme === "dark",
                },
                {
                  label: "Notifications",
                  subLabel: "Receive system notifications",
                  isActive: false,
                },
                {
                  label: "Auto-save",
                  subLabel: "Automatically save conversations",
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
                      isActive ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform rounded-full bg-white shadow-lg transition-transform ${
                        isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    ></span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;