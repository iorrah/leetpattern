'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface CodeEditorPanelProps {
  value: string;
  onChange: (value: string | undefined) => void;
  onSubmit: () => void;
}

export default function CodeEditorPanel({ value, onChange, onSubmit }: CodeEditorPanelProps) {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
        Console Input Editor
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          theme="light"
          language="javascript"
          value={value}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="p-4 border-t border-slate-200 flex justify-end bg-white">
        <button
          onClick={onSubmit}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-500 transition-colors shadow-sm"
        >
          Submit Answer <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
