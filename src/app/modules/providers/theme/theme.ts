import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { global } from './styles/global';
import { Button } from './styles/button';
import { colors } from './styles/colors';

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false
};

const overrides = {
	config,
	colors,
	styles: {
		global
	},
	components: {
		Button
	}
};

export const theme = extendTheme(overrides);
