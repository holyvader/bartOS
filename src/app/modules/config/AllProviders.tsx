import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';

type ProvidersProps = {
	children: React.ReactNode;
};

export const AllProviders: React.FC<ProvidersProps> = ({ children }) => (
	<ThemeProvider>{children}</ThemeProvider>
);
