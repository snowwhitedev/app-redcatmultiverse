import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useCurrentTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const _currentTheme = theme === "system" ? systemTheme : theme;
    _currentTheme ? setCurrentTheme(_currentTheme) : setCurrentTheme('dark');
  }, [systemTheme, theme]);

  return { currentTheme }
}

export default useCurrentTheme;
