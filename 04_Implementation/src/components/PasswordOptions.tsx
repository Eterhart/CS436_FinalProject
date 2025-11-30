import { Sliders } from 'lucide-react';
import type { PasswordConfig } from '../types/password';

// จัดทำโดย
// 1670704251 นุชนิชา รุ่งพรหมา เลขที่ 23
// 1670704376 ธนกฤต ดีเนียม เลขที่ 24

interface PasswordOptionsProps {
  config: PasswordConfig;
  onChange: (config: Partial<PasswordConfig>) => void;
}

export function PasswordOptions({ config, onChange }: PasswordOptionsProps) {
  const options = [
    { key: 'includeUppercase', label: 'A-Z', enabled: config.includeUppercase },
    { key: 'includeLowercase', label: 'a-z', enabled: config.includeLowercase },
    { key: 'includeNumbers', label: '0-9', enabled: config.includeNumbers },
    { key: 'includeSymbols', label: '!@#$%^&*', enabled: config.includeSymbols },
  ];

  const enabledCount = options.filter(opt => opt.enabled).length;

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
              Length
            </label>
            <span className="text-lg font-mono font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-xl">
              {config.length}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="128"
            value={config.length}
            onChange={(e) => onChange({ length: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>5</span>
            <span>128</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-3">
            Include
          </label>
          <div className="grid grid-cols-2 gap-3">
            {options.map((option) => {
              const isDisabled = enabledCount === 1 && option.enabled;
              return (
                <label
                  key={option.key}
                  className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-200 ${
                    isDisabled
                      ? 'cursor-not-allowed bg-gray-800 border-gray-700 text-white shadow-md'
                      : option.enabled
                      ? 'cursor-pointer bg-gray-800 border-gray-700 text-white shadow-md'
                      : 'cursor-pointer bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={option.enabled}
                    onChange={(e) => onChange({ [option.key]: e.target.checked })}
                    disabled={isDisabled}
                    className={`w-4 h-4 rounded ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  />
                  <span className={`text-sm font-medium ${option.enabled || isDisabled ? 'text-white' : 'text-gray-700'}`}>
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600 block">
              Min numbers
            </label>
            <input
              type="number"
              min="0"
              max={config.length - config.minSymbols}
              value={config.minNumbers}
              onChange={(e) => onChange({ minNumbers: Math.max(0, Math.min(config.length - config.minSymbols, parseInt(e.target.value) || 0)) })}
              disabled={!config.includeNumbers}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-mono focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600 block">
              Min special
            </label>
            <input
              type="number"
              min="0"
              max={config.length - config.minNumbers}
              value={config.minSymbols}
              onChange={(e) => onChange({ minSymbols: Math.max(0, Math.min(config.length - config.minNumbers, parseInt(e.target.value) || 0)) })}
              disabled={!config.includeSymbols}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-mono focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>
        </div>

        <label className="flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-200 bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100">
          <input
            type="checkbox"
            checked={config.avoidAmbiguous}
            onChange={(e) => onChange({ avoidAmbiguous: e.target.checked })}
            className="w-4 h-4 rounded cursor-pointer flex-shrink-0 mt-0.5"
          />
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-700 block mb-1">
              Avoid ambiguous characters
            </span>
            <span className="text-xs text-gray-500">
              Excludes: i, I, l, L, 1, o, O, 0
            </span>
          </div>
        </label>

        {enabledCount === 0 && (
          <p className="text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-xl p-4">
            Please select at least one character type
          </p>
        )}
      </div>
    </div>
  );
}
