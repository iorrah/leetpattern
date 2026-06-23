'use client';

import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ChatPanelProps {
  onSendMessage: (message: string) => Promise<boolean>; // Returns true if step was advanced
}

export default function ChatPanel({ onSendMessage }: ChatPanelProps) {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsProcessing(true);

    // Call the orchestration logic
    const advanced = await onSendMessage(userMsg);

    if (!advanced) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Keep refining your thoughts. Does this cover all edge cases?' },
      ]);
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-slate-200">
      <div className="px-6 py-3 border-b border-slate-200 bg-white text-xs font-bold text-slate-500 uppercase tracking-wider">
        AI Coach Discourse
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg text-sm max-w-[85%] ${m.sender === 'user' ? 'bg-indigo-600 text-white ml-auto' : 'bg-white border border-slate-200 text-slate-700'}`}
          >
            {m.text}
          </div>
        ))}
        {isProcessing && <div className="text-xs text-slate-400 italic">Coach is thinking...</div>}
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Refine your thoughts here..."
          className="w-full h-24 p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={isProcessing}
          className="mt-3 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-500 w-full disabled:opacity-50"
        >
          {isProcessing ? 'Analyzing...' : 'Send Message'} <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
