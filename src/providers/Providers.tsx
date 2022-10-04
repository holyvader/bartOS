import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';

type ProvidersProps = {
	children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => (
	<ThemeProvider>{children}</ThemeProvider>
);
