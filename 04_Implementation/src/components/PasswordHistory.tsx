import { History, Trash2, Clock, Copy } from 'lucide-react';
import { useState } from 'react';
import type { PasswordEntry } from '../types/password';

// จัดทำโดย
// 1670704251 นุชนิชา รุ่งพรหมา เลขที่ 23
// 1670704376 ธนกฤต ดีเนียม เลขที่ 24

interface PasswordHistoryProps {
  history: PasswordEntry[];
  onLoad: (entry: PasswordEntry) => void;
  onClear: () => void;
}

export function PasswordHistory({ history, onLoad, onClear }: PasswordHistoryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (entry: PasswordEntry) => {
    await navigator.clipboard.writeText(entry.password);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getConfigSummary = (entry: PasswordEntry) => {
    if (entry.mode === 'password' && entry.passwordConfig) {
      const config = entry.passwordConfig;
      const parts = [];
      if (config.includeUppercase) parts.push('A-Z');
      if (config.includeLowercase) parts.push('a-z');
      if (config.includeNumbers) parts.push('0-9');
      if (config.includeSymbols) parts.push('!@#');
      return `${config.length} chars • ${parts.join(' • ')}`;
    } else if (entry.mode === 'passphrase' && entry.passphraseConfig) {
      const config = entry.passphraseConfig;
      const parts = [];
      parts.push(`${config.wordCount} words`);
      if (config.separator) parts.push(`sep: "${config.separator}"`);
      if (config.capitalize) parts.push('caps');
      if (config.includeNumber) parts.push('number');
      return parts.join(' • ');
    }
    return 'Unknown config';
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col h-fit">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <History className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">History</h2>
          {history.length > 0 && (
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
              {history.length}
            </span>
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-6 flex items-center justify-center">
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-2">
              <History className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-xs">
              History appears here
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5 overflow-y-auto pr-2 custom-scrollbar max-h-[280px]">
          {history.map((entry) => (
          <div
            key={entry.id}
            className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-xl p-4 transition-all duration-200 group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                <span className="text-xs text-gray-600 font-medium">
                  {formatTime(entry.timestamp)}
                </span>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleCopy(entry)}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all duration-200 hover:scale-105"
                  title="Copy password"
                >
                  <Copy className="w-3.5 h-3.5 text-gray-700" />
                </button>
                <button
                  onClick={() => onLoad(entry)}
                  className="px-3 py-1.5 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-700 hover:border-gray-600 text-white text-xs font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  Load
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 mb-2.5 border border-gray-200">
              <p className="font-mono text-sm text-gray-900 break-all leading-relaxed">
                {entry.password}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 text-xs text-gray-600 font-medium">
                {getConfigSummary(entry)}
              </div>
              {copiedId === entry.id && (
                <div className="text-xs text-gray-700 flex items-center gap-1.5 font-medium animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </div>
              )}
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
