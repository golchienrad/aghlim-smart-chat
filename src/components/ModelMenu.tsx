import { ChevronDown, Sparkles } from 'lucide-react';
import { MenuProps } from '../types/types';

interface ModelMenuProps extends MenuProps {
  isMobile: boolean;
}

const ModelMenu: React.FC<ModelMenuProps> = ({ isMobile, onToggle, isOpen }) => (
  <div className={`relative ${isMobile ? 'flex md:hidden' : 'md:flex hidden'}`}>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white transition-colors"
      aria-label="Select model"
    >
      <span className="text-lg font-medium">ChatGPT</span>
      <ChevronDown size={26} className="text-gray-400" />
    </button>
    {isOpen && (
      <div
        className={`absolute top-10 left-0 ${
          isMobile ? 'w-[213px] px-2 py-1' : 'w-80 px-3 py-2'
        } bg-[#303030] rounded-xl shadow-lg z-50`}
      >
        <div className={isMobile ? 'py-1' : 'py-2'}>
          <div
            className={`flex items-center ${isMobile ? 'gap-1 p-2' : 'gap-2 p-3'} rounded-lg`}
          >
            <Sparkles size={isMobile ? 20 : 26} className="text-purple-400" />
            <div className="flex-1">
              <div className={`text-white font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                ChatGPT Plus
              </div>
              <div className={`text-gray-400 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
                Our smartest model & more
              </div>
            </div>
            <button
              className={`${
                isMobile ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
              } bg-white text-gray-900 font-medium rounded-md`}
            >
              Upgrade
            </button>
          </div>
        </div>
        <div className={isMobile ? 'py-0.5' : 'py-1'}>
          <div
            className={`flex items-center ${
              isMobile ? 'gap-1 p-2' : 'gap-2 p-3'
            } rounded-lg hover:bg-gray-700 cursor-pointer`}
          >
            <div
              className={`${
                isMobile ? 'w-3 h-3' : 'w-4 h-4'
              } rounded-full bg-green-500 flex items-center justify-center`}
            >
              <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white`}></div>
            </div>
            <div className="flex-1">
              <div className={`text-white font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                ChatGPT
              </div>
              <div className={`text-gray-400 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
                Great for everyday tasks
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default ModelMenu;