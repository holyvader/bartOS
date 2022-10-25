import { MantineThemeOverride } from '@mantine/core';
import { colors } from './styles/colors';
import { spacing } from './styles/spacing';

export const theme: MantineThemeOverride = {
	colors,
	spacing,
	colorScheme: 'light',
	primaryColor: 'primary',
	defaultRadius: 0
};
