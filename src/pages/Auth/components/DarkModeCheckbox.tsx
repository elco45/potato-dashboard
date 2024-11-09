import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

export const DarkModeCheckbox = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const initializeDarkMode = () => {
    const savedMode = localStorage.getItem('darkMode') || 'true';
    const initialDarkMode = savedMode
      ? savedMode === 'true'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(initialDarkMode);
    document.documentElement.classList.toggle('dark', initialDarkMode);
  };

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
    localStorage.setItem('darkMode', checked.toString());
  };

  useEffect(() => {
    initializeDarkMode();
  }, []);

  return (
    <div className="flex items-center space-x-2 text-[#121212] dark:text-white">
      <Checkbox
        id="darkMode"
        className="dark:bg-transparent border-none text-[#121212] dark:text-white bg-[#121212]"
        onCheckedChange={checked => toggleDarkMode(!!checked)}
        checked={isDarkMode}
      />
      <label
        htmlFor="darkMode"
        className="text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        Enable Dark Mode
      </label>
    </div>
  );
};
