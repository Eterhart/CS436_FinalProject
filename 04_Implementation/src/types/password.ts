export type GeneratorMode = 'password' | 'passphrase';

export interface PasswordConfig {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  minNumbers: number;
  minSymbols: number;
  avoidAmbiguous: boolean;
}

export interface PassphraseConfig {
  wordCount: number;
  separator: string;
  capitalizeFirstLetter: boolean;
  includeNumber: boolean;
  useFullWords: boolean;
}

export interface PasswordEntry {
  id: string;
  password: string;
  timestamp: Date;
  mode: GeneratorMode;
  passwordConfig?: PasswordConfig;
  passphraseConfig?: PassphraseConfig;
}

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  crackTime: string;
}
