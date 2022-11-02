import { useMantineColorScheme } from '@mantine/core';

export function useColorScheme() {
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();
	return {
		toggleColorScheme,
		colorScheme,
		isDark: colorScheme === 'dark',
		isLight: colorScheme === 'light'
	};
}
