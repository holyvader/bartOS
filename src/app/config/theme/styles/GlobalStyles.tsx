import { Global } from '@mantine/core';
import { FC } from 'react';

export const GlobalStyles: FC = () => {
	return (
		<Global
			styles={(theme) => ({
				html: {
					height: '100%'
				},
				body: {
					backgroundImage: 'url(/bartos-bg.jpg)',
					backgroundPosition: 'center center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundColor: theme.white
				}
			})}
		/>
	);
};
