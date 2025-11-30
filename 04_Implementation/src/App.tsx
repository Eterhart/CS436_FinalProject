import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PasswordDisplay } from './components/PasswordDisplay';
import { PasswordOptions } from './components/PasswordOptions';
import { PassphraseOptions } from './components/PassphraseOptions';
import { PasswordHistory } from './components/PasswordHistory';
import { SecurityScore } from './components/SecurityScore';
import { SecurityTips } from './components/SecurityTips';
import { generatePassword } from './utils/passwordGenerator';
import { generatePassphrase } from './utils/passphraseGenerator';
import type { GeneratorMode, PasswordConfig, PassphraseConfig, PasswordEntry } from './types/password';

// จัดทำโดย
// 1670704251 นุชนิชา รุ่งพรหมา เลขที่ 23
// 1670704376 ธนกฤต ดีเนียม เลขที่ 24

function App() {
  const [mode, setMode] = useState<GeneratorMode>('password');

  const defaultPasswordConfig: PasswordConfig = {
    length: 14,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    minNumbers: 1,
    minSymbols: 0,
    avoidAmbiguous: false,
  };

  const defaultPassphraseConfig: PassphraseConfig = {
    wordCount: 6,
    separator: '-',
    capitalizeFirstLetter: true,
    includeNumber: true,
    useFullWords: true,
  };

  const [password, setPassword] = useState(() => generatePassword(defaultPasswordConfig));
  const [passwordConfig, setPasswordConfig] = useState<PasswordConfig>(defaultPasswordConfig);
  const [passphraseConfig, setPassphraseConfig] = useState<PassphraseConfig>(defaultPassphraseConfig);
  const [history, setHistory] = useState<PasswordEntry[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newPassword = mode === 'password'
      ? generatePassword(passwordConfig)
      : generatePassphrase(passphraseConfig);
    setPassword(newPassword);
    setCopied(false);
  }, [mode, passwordConfig, passphraseConfig]);

  const handleGenerate = () => {
    const newPassword = mode === 'password'
      ? generatePassword(passwordConfig)
      : generatePassphrase(passphraseConfig);

    setPassword(newPassword);
    setCopied(false);

    const entry: PasswordEntry = {
      id: Date.now().toString(),
      password: newPassword,
      timestamp: new Date(),
      mode,
      passwordConfig: mode === 'password' ? { ...passwordConfig } : undefined,
      passphraseConfig: mode === 'passphrase' ? { ...passphraseConfig } : undefined,
    };

    setHistory(prev => [entry, ...prev]);
  };

  const handleCopy = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePasswordConfigChange = (newConfig: Partial<PasswordConfig>) => {
    const updatedConfig = { ...passwordConfig, ...newConfig };

    if (newConfig.length !== undefined) {
      if (updatedConfig.minNumbers > newConfig.length) {
        updatedConfig.minNumbers = newConfig.length;
      }
      if (updatedConfig.minSymbols > newConfig.length) {
        updatedConfig.minSymbols = newConfig.length;
      }
    }

    setPasswordConfig(updatedConfig);
  };

  const handlePassphraseConfigChange = (newConfig: Partial<PassphraseConfig>) => {
    setPassphraseConfig({ ...passphraseConfig, ...newConfig });
  };

  const handleLoadFromHistory = (entry: PasswordEntry) => {
    setPassword(entry.password);
    setMode(entry.mode);
    if (entry.mode === 'password' && entry.passwordConfig) {
      setPasswordConfig(entry.passwordConfig);
    } else if (entry.mode === 'passphrase' && entry.passphraseConfig) {
      setPassphraseConfig(entry.passphraseConfig);
    }
    setCopied(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-200/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gray-100/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-200/10 to-transparent"></div>

      <div className="relative min-h-screen">
        <Header />

        <main className="w-full px-3 sm:px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 lg:items-start">

            <div className="lg:col-span-2 flex flex-col gap-3 lg:gap-4 lg:sticky lg:top-4">
              <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
                <div className="bg-gray-100 rounded-2xl p-1.5">
                  <button
                    onClick={() => setMode('password')}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group ${
                      mode === 'password'
                        ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {mode === 'password' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    )}
                    <span className="relative z-10">Password</span>
                  </button>
                  <button
                    onClick={() => setMode('passphrase')}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 mt-1.5 relative overflow-hidden group ${
                      mode === 'passphrase'
                        ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {mode === 'passphrase' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    )}
                    <span className="relative z-10">Passphrase</span>
                  </button>
                </div>
              </div>

              {mode === 'password' ? (
                <PasswordOptions
                  config={passwordConfig}
                  onChange={handlePasswordConfigChange}
                />
              ) : (
                <PassphraseOptions
                  config={passphraseConfig}
                  onChange={handlePassphraseConfigChange}
                />
              )}
            </div>

            <div className="lg:col-span-8 flex flex-col gap-3 lg:gap-4">
              <PasswordDisplay
                password={password}
                copied={copied}
                onCopy={handleCopy}
                onGenerate={handleGenerate}
              />

              <PasswordHistory
                history={history}
                onLoad={handleLoadFromHistory}
                onClear={handleClearHistory}
              />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-3 lg:gap-4 lg:sticky lg:top-4">
              <SecurityScore password={password} />
              <SecurityTips password={password} />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default App;
