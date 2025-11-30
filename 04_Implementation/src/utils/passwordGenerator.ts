import type { PasswordConfig, PasswordStrength } from '../types/password';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const AMBIGUOUS_CHARS = 'iIlL1oO0';

export function generatePassword(config: PasswordConfig): string {
  let uppercase = UPPERCASE;
  let lowercase = LOWERCASE;
  let numbers = NUMBERS;
  let symbols = SYMBOLS;

  if (config.avoidAmbiguous) {
    uppercase = uppercase.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    lowercase = lowercase.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    numbers = numbers.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
  }

  let charset = '';
  const requiredChars: string[] = [];

  if (config.includeUppercase) {
    charset += uppercase;
  }
  if (config.includeLowercase) {
    charset += lowercase;
  }
  if (config.includeNumbers) {
    charset += numbers;
  }
  if (config.includeSymbols) {
    charset += symbols;
  }

  if (charset === '') {
    return '';
  }

  const effectiveMinNumbers = Math.min(config.minNumbers, config.length);
  const effectiveMinSymbols = Math.min(config.minSymbols, config.length);

  const totalRequired = effectiveMinNumbers + effectiveMinSymbols;
  if (totalRequired > config.length) {
    const ratio = config.length / totalRequired;
    const adjustedMinNumbers = Math.floor(effectiveMinNumbers * ratio);
    const adjustedMinSymbols = config.length - adjustedMinNumbers;

    for (let i = 0; i < adjustedMinNumbers && config.includeNumbers; i++) {
      requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    for (let i = 0; i < adjustedMinSymbols && config.includeSymbols; i++) {
      requiredChars.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
  } else {
    for (let i = 0; i < effectiveMinNumbers && config.includeNumbers; i++) {
      requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    for (let i = 0; i < effectiveMinSymbols && config.includeSymbols; i++) {
      requiredChars.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    if (config.includeUppercase && !requiredChars.some(c => uppercase.includes(c)) && requiredChars.length < config.length) {
      requiredChars.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    }
    if (config.includeLowercase && !requiredChars.some(c => lowercase.includes(c)) && requiredChars.length < config.length) {
      requiredChars.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    }
  }

  const remainingLength = config.length - requiredChars.length;
  let password = '';

  for (let i = 0; i < remainingLength; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  const allChars = (password + requiredChars.join('')).split('');

  for (let i = allChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
  }

  return allChars.join('');
}

function estimateCrackTime(password: string): string {
  let charsetSize = 0;

  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

  const combinations = Math.pow(charsetSize, password.length);
  const attemptsPerSecond = 1e9;
  const secondsToCrack = combinations / (2 * attemptsPerSecond);

  const minute = 60;
  const hour = 3600;
  const day = 86400;
  const month = 2592000;
  const year = 31536000;

  if (secondsToCrack < 1) return 'instantly';
  if (secondsToCrack < minute) return `${Math.round(secondsToCrack)} seconds`;
  if (secondsToCrack < hour) return `${Math.round(secondsToCrack / minute)} minutes`;
  if (secondsToCrack < day) return `${Math.round(secondsToCrack / hour)} hours`;
  if (secondsToCrack < month) return `${Math.round(secondsToCrack / day)} days`;
  if (secondsToCrack < year) return `${Math.round(secondsToCrack / month)} months`;

  const years = Math.round(secondsToCrack / year);
  if (years <= 50) return `${years} years`;
  return 'centuries';
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: 'None', color: 'bg-gray-400', crackTime: 'instantly' };
  }

  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  const crackTime = estimateCrackTime(password);

  if (score <= 2) {
    return { score, label: 'Very Weak', color: 'bg-gray-400', crackTime };
  } else if (score <= 4) {
    return { score, label: 'Weak', color: 'bg-gray-500', crackTime };
  } else if (score <= 5) {
    return { score, label: 'Good', color: 'bg-gray-600', crackTime };
  } else {
    return { score, label: 'Strong', color: 'bg-gray-800', crackTime };
  }
}
