import { Copy, RefreshCw, Check } from 'lucide-react';
import { calculatePasswordStrength } from '../utils/passwordGenerator';

// จัดทำโดย
// 1670704251 นุชนิชา รุ่งพรหมา เลขที่ 23
// 1670704376 ธนกฤต ดีเนียม เลขที่ 24

interface PasswordDisplayProps {
  password: string;
  copied: boolean;
  onCopy: () => void;
  onGenerate: () => void;
}

export function PasswordDisplay({ password, copied, onCopy, onGenerate }: PasswordDisplayProps) {
  const strength = calculatePasswordStrength(password);

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 lg:p-10 space-y-8 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div>
        <div className="mb-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Password Generator
          </h2>
          <p className="text-base lg:text-lg text-gray-600 font-medium">
            Generate strong, unique passwords
          </p>
        </div>

        <div className="relative group">
          <div className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-8 lg:p-12 min-h-[160px] flex items-center justify-center transition-all duration-300 group-hover:border-gray-400 group-hover:shadow-xl">
            {password ? (
              <p className="text-3xl lg:text-4xl font-mono font-bold text-gray-900 break-all text-center leading-relaxed tracking-wider selection:bg-gray-300 selection:text-gray-900">
                {password}
              </p>
            ) : (
              <p className="text-gray-500 text-center">
                Click "Generate Password" to create a secure password
              </p>
            )}
          </div>

          {password && (
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 rounded-b-2xl overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ease-out ${strength.color} relative`}
                style={{ width: `${(strength.score / 7) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onGenerate}
          className="flex-1 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] text-lg group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          <RefreshCw className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180 relative z-10" />
          <span className="relative z-10">Regenerate</span>
        </button>

        {password && (
          <button
            onClick={onCopy}
            className="sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-5 px-10 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 hover:scale-[1.03] active:scale-[0.98] text-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            {copied ? (
              <>
                <Check className="w-6 h-6 animate-fade-in relative z-10" />
                <span className="relative z-10">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Copy</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
