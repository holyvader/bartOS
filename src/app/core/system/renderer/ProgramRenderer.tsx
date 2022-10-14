import React, { CSSProperties, FC } from 'react';
import { useProgramToRenderList } from '@system/renderer/useProgramToRenderList';
import { system } from '@system/system';

export const ProgramRenderer: FC = () => {
	const programs = useProgramToRenderList();

	return (
		<div style={styles}>
			{programs.map((it) => (
				<it.definition
					dependencies={it.dependencies?.map((name) =>
						system.getInjectableService(name)
					)}
					key={it.pid}
				/>
			))}
		</div>
	);
};

const styles: CSSProperties = {
	position: 'fixed',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
};
