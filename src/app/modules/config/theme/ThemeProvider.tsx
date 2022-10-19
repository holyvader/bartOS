import { FC, ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			{children}
		</MantineProvider>
	);
};
