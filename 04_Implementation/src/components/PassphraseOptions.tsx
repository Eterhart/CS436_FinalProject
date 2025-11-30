import { Sliders } from 'lucide-react';
import type { PassphraseConfig } from '../types/password';

// จัดทำโดย
// 1670704251 นุชนิชา รุ่งพรหมา เลขที่ 23
// 1670704376 ธนกฤต ดีเนียม เลขที่ 24

interface PassphraseOptionsProps {
  config: PassphraseConfig;
  onChange: (config: Partial<PassphraseConfig>) => void;
}

export function PassphraseOptions({ config, onChange }: PassphraseOptionsProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="flex items-center gap-3">
        <Sliders className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Options</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Number of words
            </label>
            <span className="text-lg font-mono font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-xl">
              {config.wordCount}
            </span>
          </div>
          <input
            type="range"
            min="3"
            max="20"
            value={config.wordCount}
            onChange={(e) => onChange({ wordCount: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>3</span>
            <span>20</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 block">
            Word separator
          </label>
          <input
            type="text"
            value={config.separator}
            onChange={(e) => onChange({ separator: e.target.value })}
            maxLength={3}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-mono focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
            placeholder="-"
          />
        </div>

        <div className="space-y-3">
          <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
            config.capitalizeFirstLetter
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
          }`}>
            <input
              type="checkbox"
              checked={config.capitalizeFirstLetter}
              onChange={(e) => onChange({ capitalizeFirstLetter: e.target.checked })}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <span className={`text-sm font-medium ${config.capitalizeFirstLetter ? 'text-white' : 'text-gray-700'}`}>
              Capitalize the first letter
            </span>
          </label>

          <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
            config.includeNumber
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
          }`}>
            <input
              type="checkbox"
              checked={config.includeNumber}
              onChange={(e) => onChange({ includeNumber: e.target.checked })}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <span className={`text-sm font-medium ${config.includeNumber ? 'text-white' : 'text-gray-700'}`}>
              Include number
            </span>
          </label>

          <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
            config.useFullWords
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
          }`}>
            <input
              type="checkbox"
              checked={config.useFullWords}
              onChange={(e) => onChange({ useFullWords: e.target.checked })}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <span className={`text-sm font-medium ${config.useFullWords ? 'text-white' : 'text-gray-700'}`}>
              Use full words
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
