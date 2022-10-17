import { ProgramDefinition } from '@system/definitions/program.definition';
import { CSSProperties } from 'react';
import { Taskbar } from '@system-programs/desktop/Taskbar/Taskbar';

import { ProgramExecutionService } from '@system-services/program-execution/services/program-execution.service';
import { ProgramService } from '@system-services/program/services/program.service';
import { Box } from '@ui/core/box/Box';
import { useProgramInstanceList } from '@system-services/program-execution/hooks/useProgramInstanceList';

export const Desktop: ProgramDefinition<[ProgramExecutionService, ProgramService]> = ({
	dependencies
}) => {
	const [programExecutionService, programService] = dependencies ?? [];
	const manifests = useProgramInstanceList(programExecutionService);
	console.info('running: ', manifests);
	return (
		<Box style={style}>
			<Taskbar dependencies={dependencies} programInstances={manifests} />
		</Box>
	);
};

const style: CSSProperties = {
	position: 'fixed',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
};
