import React, { CSSProperties, FC } from 'react';
import { useProgramToRenderList } from '@system/renderer/useProgramToRenderList';
import { system } from '@system/system';
import { filterNotEmpty } from '@system/data-manipulation/collection/filter-not-empty';

export const ProgramRenderer: FC = () => {
	const programs = useProgramToRenderList();

	return (
		<div style={styles}>
			{programs.map((it) => (
				<it.definition
					dependencies={filterNotEmpty(it.dependencies?.map( it => system.serviceManager.getInstance(it)))}
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
