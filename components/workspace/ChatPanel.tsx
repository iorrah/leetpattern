'use client';

import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ChatPanelProps {
  onSendMessage: (message: string) => Promise<string>;
  onContinue: () => void;
}

export default function ChatPanel({ onSendMessage, onContinue }: ChatPanelProps) {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: "Hi! Explain the problem in your own words and I'll help you improve your understanding.",
    },
  ]);

  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsProcessing(true);

    try {
      const reply = await onSendMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-slate-200">
      <div className="px-6 py-3 border-b border-slate-200 bg-white text-xs font-bold text-slate-500 uppercase tracking-wider">
        AI Coach
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`group relative max-w-[85%] rounded-lg p-6 pr-10 text-sm whitespace-pre-wrap ${
              message.sender === 'user'
                ? 'ml-auto bg-indigo-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700'
            }`}
          >
            <div>{message.text}</div>

            <button
              onClick={() => handleCopy(message.text, index)}
              className={`cursor-pointer absolute right-2 top-2 p-1 rounded transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 ${
                message.sender === 'user'
                  ? 'text-indigo-200 hover:text-white hover:bg-indigo-700'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title="Copy message content"
            >
              {copiedIndex === index ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <DocumentDuplicateIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        ))}

        {isProcessing && <div className="text-xs italic text-slate-400">Coach is thinking...</div>}
      </div>

      <div className="border-t border-slate-200 bg-white p-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask the coach..."
          className="h-24 w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="mt-3 flex gap-3">
          <button
            onClick={handleSend}
            disabled={isProcessing}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {isProcessing ? 'Thinking...' : 'Send Message'}
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>

          <button
            onClick={onContinue}
            className="cursor-pointer rounded-lg border border-slate-300 bg-white px-6 py-2 font-semibold text-slate-700 hover:bg-slate-100"
          >
            {"I'm Ready! Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
}
