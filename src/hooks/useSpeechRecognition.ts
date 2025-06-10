import { useState, useEffect, useCallback, useRef } from 'react';
import { SpeechRecognitionEvent, SpeechRecognition } from '../types/types';

export const useSpeechRecognition = (
  onTranscript: (transcript: string) => void,
  onAdjustHeight: () => void
) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'fa-IR';
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = true;

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        onTranscript(finalTranscript + interimTranscript);
        onAdjustHeight();
      };

      recognitionRef.current.onend = () => setIsRecording(false);
      recognitionRef.current.onerror = (event: { error: string }) => {
        setIsRecording(false);
        console.error(`Speech recognition error: ${event.error === 'no-speech' ? 'صدایی شناسایی نشد.' : event.error}`);
        alert(`خطا در ضبط صدا: ${event.error === 'no-speech' ? 'صدایی شناسایی نشد.' : 'لطفاً دوباره تلاش کنید.'}`);
      };

      return () => {
        recognitionRef.current?.stop();
      };
    } else {
      console.warn('Speech Recognition API is not supported in this browser.');
    }
  }, [onTranscript, onAdjustHeight]);

  const toggleRecording = useCallback(async () => {
    if (!isSpeechSupported || !recognitionRef.current) {
      alert('مرورگر شما از قابلیت ضبط صدا پشتیبانی نمی‌کند.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);
        recognitionRef.current.start();
      } catch (error) {
        setIsRecording(false);
        console.error('Microphone access denied:', error);
        alert('دسترسی به میکروفون رد شد. لطفاً اجازه دسترسی بدهید.');
      }
    }
  }, [isRecording, isSpeechSupported]);

  return { isRecording, toggleRecording, isSpeechSupported };
};