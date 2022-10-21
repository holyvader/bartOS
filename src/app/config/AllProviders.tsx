import { ThemeProvider } from './theme/ThemeProvider';
import { FC } from 'react';

type ProvidersProps = WithChildren;

export const AllProviders: FC<ProvidersProps> = ({ children }) => (
	<ThemeProvider>{children}</ThemeProvider>
);
