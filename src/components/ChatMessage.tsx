import React, { useState, useEffect } from 'react';
import { Message } from '../types';
import { ThumbsUp, ThumbsDown, Copy, Share2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  //////////////////////////////////////////////////////////////////////////this code use for getting advertise image////////////
  const allAdvertiseData = useSelector((state) => state.allAdvertse.allAdvertise)
  const [advertiseImages, setAdvertiseImages] = useState([])




  const usertoken = sessionStorage.getItem("usertoken")
  useEffect(() => {
    const getAllAdvertiseCode = async () => {
      if (!usertoken) {
        console.warn("توکن موجود نیست.");
        return;
      }

      if (allAdvertiseData && allAdvertiseData.length !== 0) {
        try {
          const requests = allAdvertiseData.slice(0, 5).map((advertse) => {
            if (!advertse.advertiseCode) {
              console.warn("کد تبلیغ وجود ندارد:", advertse);
              return null;
            }

            return axios.get(
              `https://api.eghlym.com/api/AdvertiseController/GetAllAdvertise_Pagination?PageNumber=1&PageSize=1&advertiseCode=3DmTensR`,
              {
                headers: {
                  Authorization: `Bearer ${usertoken}`,
                },
              }
            );
          });

          const validRequests = requests.filter(Boolean); // حذف null ها
          const responses = await Promise.allSettled(validRequests);

          responses.forEach((res, index) => {
            if (res.status === 'fulfilled') {
              setAdvertiseImages(prev => [...prev, res?.value?.data[0]]);
              console.log("پاسخ موفق:", res.value.data[0]);
            } else {
              console.error("خطا در درخواست:", res.reason);
            }
          });
        } catch (error) {
          console.error("خطای کلی:", error);
        }
      }
    };

    getAllAdvertiseCode();
  }, [allAdvertiseData]);



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {
    if (message.role === 'assistant' && displayedContent === '') {
      setIsTyping(true);
      const words = message.content.split(' ');
      let currentWordIndex = 0;

      const interval = setInterval(() => {
        if (currentWordIndex < words.length) {
          setDisplayedContent(words.slice(0, currentWordIndex + 1).join(' '));
          currentWordIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 100); // سرعت تایپ: 100ms برای هر کلمه

      return () => clearInterval(interval);
    } else if (message.role === 'user') {
      setDisplayedContent(message.content);
    }
  }, [message.content, message.role]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`group  relative  py-4 ${isAssistant ? '' : 'bg-gray-300 dark:bg-[#323232d9] rounded-2xl'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="max-w-3xl mx-auto  flex items-start gap-4 px-4 mt- ">
        <div className="flex-1 overflow-hidden">
          <div className='bg-red-600 w-[200px] h-[100px]'> {advertiseImages && advertiseImages.length !== 0 && advertiseImages.map((ade) => {
            return ade.Images.map((img) => {
              return <img src={img.Url} alt="" />
            })
          })}
          </div>


          <div
            className={`prose dark:prose-invert max-w-none  ${isAssistant ? '' : 'text-gray-700 dark:text-gray-300'
              }`}
            dir="rtl"
          >
            <p className="whitespace-pre-wrap leading-7 ">{displayedContent}</p>
          </div>

          {isTyping && (
            <div className="mt-1 flex gap-1 justify-end ">
              <span
                className="w-1 h-1 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></span>
              <span
                className="w-1 h-1 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></span>
              <span
                className="w-1 h-1 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></span>

            </div>
          )}
        </div>

      </div>

      {isAssistant && !isTyping && showActions && (
        <div className="absolute bottom-2 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors relative"
            title={isCopied ? 'کپی شد!' : 'کپی پیام'}
          >
            <Copy size={16} />
            {isCopied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                کپی شد!
              </span>
            )}
          </button>
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <ThumbsUp size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <ThumbsDown size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <Share2 size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      )}

    </div>
  );
};

export default ChatMessage;