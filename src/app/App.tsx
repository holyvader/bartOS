import { FC } from 'react';
import { ProgramRenderer } from '@system/renderer/ProgramRenderer';
import { useAppBoot } from './useAppBoot';

export const App: FC = () => {
	useAppBoot();

	return (
		<div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
			<ProgramRenderer />
		</div>
	);
};
