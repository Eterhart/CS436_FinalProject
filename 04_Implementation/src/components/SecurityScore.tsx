import { Shield, Clock } from 'lucide-react';
import { calculatePasswordStrength } from '../utils/passwordGenerator';

// จัดทำโดย
// 1670704251 นุชนิชา รุ่งพรหมา เลขที่ 23
// 1670704376 ธนกฤต ดีเนียม เลขที่ 24

interface SecurityScoreProps {
  password: string;
}

export function SecurityScore({ password }: SecurityScoreProps) {
  const strength = calculatePasswordStrength(password);

  const getStrengthDescription = () => {
    if (strength.label === 'Strong') {
      return 'Thousands of years to hack this password';
    } else if (strength.label === 'Good') {
      return 'Several years to hack this password';
    } else if (strength.label === 'Weak') {
      return 'Days to months to hack this password';
    } else if (strength.label === 'Very Weak') {
      return 'Minutes to hours to hack this password';
    }
    return 'No password generated';
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Security Score</h2>
      </div>

      {password ? (
        <div className="space-y-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-bold ${
              strength.label === 'Very Weak' ? 'text-gray-500' :
              strength.label === 'Weak' ? 'text-gray-600' :
              strength.label === 'Good' ? 'text-gray-700' :
              'text-gray-900'
            }`}>
              {strength.label}
            </span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">{strength.crackTime}</span>
            </div>
          </div>

          <div className="bg-gray-200 rounded-xl overflow-hidden">
            <div
              className={`h-2 transition-all duration-500 ${strength.color}`}
              style={{ width: `${(strength.score / 7) * 100}%` }}
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-sm text-gray-600 leading-relaxed">
              {getStrengthDescription()}
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-gray-200 mt-auto">
            <div className="flex items-center justify-between text-xs bg-gray-50 rounded-lg p-2.5 border border-gray-200">
              <span className="text-gray-600 font-medium">Length</span>
              <span className="text-gray-900 font-semibold">{password.length} characters</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-gray-50 rounded-lg p-2.5 border border-gray-200">
              <span className="text-gray-600 font-medium">Character Types</span>
              <span className="text-gray-900 font-semibold">
                {[
                  /[a-z]/.test(password) && 'a-z',
                  /[A-Z]/.test(password) && 'A-Z',
                  /[0-9]/.test(password) && '0-9',
                  /[^a-zA-Z0-9]/.test(password) && 'symbols'
                ].filter(Boolean).join(', ')}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-3">
            <Shield className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">
            Generate a password to see its security score
          </p>
        </div>
      )}
    </div>
  );
}
