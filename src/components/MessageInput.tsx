import { useState, useRef, useCallback } from 'react';
import { Send, Mic, Plus, Loader2, ImagePlus, Search, Code, BrainCircuit, Lightbulb } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import QuickActionButton from './QuickActionButton';
import { ChatInputProps, QuickAction } from '../types/types';
import { chatInputStyles } from '../utils/styles';

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const { theme } = useTheme();
  const [message, setMessage] = useState('');
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isRecording, toggleRecording, isSpeechSupported } = useSpeechRecognition(
    (transcript) => setMessage(transcript),
    () => adjustTextareaHeight()
  );

  const adjustTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, []);

  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!message.trim() || isLoading) return;
      onSendMessage(message.trim());
      setMessage('');
      setHasSentMessage(true);
      adjustTextareaHeight();
    },
    [message, isLoading, onSendMessage, adjustTextareaHeight]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  const handleQuickActionClick = useCallback(
    (text: string) => {
      setMessage(text);
      setShowDropdown(false);
      setHasSentMessage(true);
      textareaRef.current?.focus();
      adjustTextareaHeight();
    },
    [adjustTextareaHeight]
  );

  const quickActions: QuickAction[] = [
    { icon: <ImagePlus size={16} />, text: 'ایجاد تصویر' },
    { icon: <Search size={16} />, text: 'جستجو در وب' },
    { icon: <Code size={16} />, text: 'کدنویسی یا نوشتن' },
    { icon: <BrainCircuit size={16} />, text: 'تحقیق عمیق', extra: '۵ باقی‌مانده' },
    { icon: <Lightbulb size={16} />, text: 'تفکر طولانی‌تر' },
  ];

  const quickButtons: QuickAction[] = [
    { icon: <ImagePlus size={16} className="ml-2" />, text: 'ایجاد تصویر' },
    { icon: <Search size={16} className="ml-2" />, text: 'خلاصه متن' },
    { icon: <BrainCircuit size={16} className="ml-2" />, text: 'برنامه‌ریزی' },
    { icon: <Lightbulb size={16} className="ml-2" />, text: 'ایده‌پردازی' },
  ];

  return (
    <div className={`${chatInputStyles.container} ${hasSentMessage ? 'p-1' : 'min-h-screen flex items-center justify-center p-1'}`}>
      <div className="relative w-full">
        <form onSubmit={handleSubmit} className={chatInputStyles.form} dir="rtl">
          <div className="flex flex-row-reverse items-start justify-between gap-2">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder={hasSentMessage ? 'هر سوالی داری بنویس...' : 'چطور می‌توانم به شما کمک کنم؟'}
              className={chatInputStyles.textarea}
              style={{ padding: '8px 10px', minHeight: '80px', maxHeight: '200px', overflowY: 'auto' }}
              dir="rtl"
              rows={1}
              aria-label="متن پیام"
              disabled={isLoading}
            />
            <div className={`flex ${hasSentMessage ? 'flex-row' : 'flex-col'} gap-2 items-center justify-start pt-1`}>
              {hasSentMessage ? (
                <>
                  <button
                    type="submit"
                    className={chatInputStyles.sendButton}
                    disabled={!message.trim() || isLoading}
                    aria-label="ارسال پیام"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`${chatInputStyles.micButton} ${isRecording ? 'animate-pulse bg-red-500/20' : ''}`}
                    disabled={isLoading || !isSpeechSupported}
                    aria-label={isRecording ? 'توقف ضبط صدا' : 'شروع ضبط صدا'}
                  >
                    <Mic size={18} className={theme === 'dark' ? 'text-white' : 'text-black'} />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={chatInputStyles.plusButton}
                  aria-label="گزینه‌های بیشتر"
                >
                  <Plus size={18} className={theme === 'dark' ? 'text-white' : 'text-black'} />
                </button>
              )}
            </div>
          </div>
        </form>
        {showDropdown && (
          <div ref={dropdownRef} className={chatInputStyles.dropdown} dir="rtl">
            {quickActions.map((action, index) => (
              <QuickActionButton key={index} action={action} onClick={handleQuickActionClick} isDropdown />
            ))}
          </div>
        )}
        {!hasSentMessage && (
          <div className="flex justify-center gap-2 mt-4 flex-wrap" dir="rtl">
            {quickButtons.map((button, index) => (
              <QuickActionButton key={index} action={button} onClick={handleQuickActionClick} />
            ))}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={chatInputStyles.quickButton}
            >
              بیشتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;