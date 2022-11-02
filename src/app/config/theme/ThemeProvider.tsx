import { FC, ReactNode } from 'react';
import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider
} from '@mantine/core';
import { theme } from './theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'bartos-color-scheme',
		defaultValue: preferredColorScheme,
		getInitialValueInEffect: true
	});
	const toggleColorScheme = (value?: ColorScheme) => {
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	};
	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{ ...theme, colorScheme }}
				withGlobalStyles
				withNormalizeCSS>
				<GlobalStyles />
				{children}
			</MantineProvider>
		</ColorSchemeProvider>
	);
};
