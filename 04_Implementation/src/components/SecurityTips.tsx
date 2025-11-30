import { Lightbulb } from 'lucide-react';

// จัดทำโดย
// 1670704251 นุชนิชา รุ่งพรหมา เลขที่ 23
// 1670704376 ธนกฤต ดีเนียม เลขที่ 24

interface SecurityTipsProps {
  password: string;
}

export function SecurityTips({ password }: SecurityTipsProps) {
  const getPasswordStrength = () => {
    if (!password) return 'none';

    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    const score =
      (length >= 12 ? 1 : 0) +
      (length >= 16 ? 1 : 0) +
      (hasLower ? 1 : 0) +
      (hasUpper ? 1 : 0) +
      (hasNumber ? 1 : 0) +
      (hasSymbol ? 1 : 0);

    if (score >= 5) return 'strong';
    if (score >= 4) return 'good';
    if (score >= 3) return 'weak';
    return 'very-weak';
  };

  const strength = getPasswordStrength();

  const tips = {
    'none': [
      { text: 'Generate a password to get started', color: 'text-gray-500' },
      { text: 'Use at least 12 characters', color: 'text-gray-500' },
      { text: 'Mix uppercase and lowercase', color: 'text-gray-500' },
      { text: 'Include numbers and symbols', color: 'text-gray-500' },
    ],
    'very-weak': [
      { text: 'Password is too weak', color: 'text-gray-500' },
      { text: 'Increase length to 12+ characters', color: 'text-gray-600' },
      { text: 'Add more character types', color: 'text-gray-600' },
      { text: 'Include uppercase letters', color: 'text-gray-600' },
    ],
    'weak': [
      { text: 'Password needs improvement', color: 'text-gray-600' },
      { text: 'Add more character variety', color: 'text-gray-700' },
      { text: 'Consider using 16+ characters', color: 'text-gray-700' },
      { text: 'Include special symbols', color: 'text-gray-700' },
    ],
    'good': [
      { text: 'Good password strength', color: 'text-gray-700' },
      { text: 'Never reuse passwords', color: 'text-gray-800' },
      { text: 'Enable 2FA when possible', color: 'text-gray-800' },
      { text: 'Store in a password manager', color: 'text-gray-800' },
    ],
    'strong': [
      { text: 'Excellent password strength', color: 'text-gray-900' },
      { text: 'Never reuse passwords', color: 'text-gray-800' },
      { text: 'Enable 2FA when possible', color: 'text-gray-800' },
      { text: 'Store in a password manager', color: 'text-gray-800' },
    ],
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 lg:p-8 shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Security Tips</h2>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {tips[strength].map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 group"
          >
            <div className={`w-1.5 h-1.5 rounded-full ${tip.color.replace('text-', 'bg-')} flex-shrink-0 mt-1.5`} />
            <span className={`text-sm font-medium ${tip.color} group-hover:brightness-110 transition-all leading-relaxed`}>
              {tip.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
