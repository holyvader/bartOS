import { ChakraProvider } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { theme } from './theme';

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
