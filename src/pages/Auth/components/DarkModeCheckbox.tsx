/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { FlyController, SpiderController } from '@/pages/Auth/utils/bugsUtil';
import { CheckBoxToggle } from '@/components/checkBox';

export const DarkModeCheckbox = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const flyController = new (FlyController as any)({});
    const spiderController = new (SpiderController as any)({});
    if (!isDarkMode) {
      flyController.reset();
      spiderController.reset();
    } else {
      flyController.end();
      spiderController.end();
    }

    return () => {
      flyController.end();
      spiderController.end();
    };
  }, [isDarkMode]);

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
    <CheckBoxToggle
      id="darkMode"
      description="Enable Dark Mode"
      checked={isDarkMode}
      onCheckedChange={toggleDarkMode}
    />
  );
};
