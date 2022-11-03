import { Global } from '@mantine/core';
import { FC } from 'react';

export const GlobalStyles: FC = () => {
	return (
		<Global
			styles={({ white, colorScheme }) => ({
				html: {
					height: '100%'
				},
				body: {
					backgroundImage: `url(/bartos-bg-${colorScheme}.jpg)`,
					backgroundPosition: 'center center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundColor: white
				}
			})}
		/>
	);
};
