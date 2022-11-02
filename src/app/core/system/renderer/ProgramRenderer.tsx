import { CSSProperties, FC } from 'react';
import { useProgramInstanceList } from '@system/renderer/useProgramInstanceList';
import { system } from '@system/system';
import { filterNotEmpty } from '@system/data/collection/filter-not-empty';
import { getProgramWrapper } from '@system/renderer/getProgramWrapper';

export const ProgramRenderer: FC = () => {
	const programs = useProgramInstanceList();
	return (
		<div style={styles}>
			{programs.map((it) => {
				const Wrapper = getProgramWrapper(it.type);
				const dependencies = filterNotEmpty(
					it.dependencies?.map((it) =>
						system.moduleServiceManager.getInstance(it)
					)
				);
				return (
					<Wrapper manifest={it} key={it.pid}>
						<it.definition dependencies={dependencies} />
					</Wrapper>
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
