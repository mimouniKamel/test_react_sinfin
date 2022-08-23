import { useContext } from 'react';
import { SettingsContext } from '../context/theme-context';
import type { SettingsContextValue } from '../context/theme-context';

export const useTheme = (): SettingsContextValue => useContext(SettingsContext);
