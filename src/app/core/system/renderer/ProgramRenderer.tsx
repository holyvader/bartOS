import React, { CSSProperties, FC } from 'react';
import { useProgramToRenderList } from '@system/renderer/useProgramToRenderList';
import { system } from '@system/system';
import { filterNotEmpty } from '@system/data-manipulation/collection/filter-not-empty';
import { useProgramWrapper } from '@system/renderer/useProgramWrapper';

export const ProgramRenderer: FC = () => {
	const programs = useProgramToRenderList();
	const getWrapper = useProgramWrapper();
	return (
		<div style={styles}>
			{programs.map((it) => {
				const Wrapper = getWrapper(it.type)(it.definition);
				return (
					<Wrapper
						dependencies={filterNotEmpty(
							it.dependencies?.map((it) =>
								system.injectableServiceManager.getInstance(it)
							)
						)}
						key={it.pid}
					/>
				);
			})}
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
