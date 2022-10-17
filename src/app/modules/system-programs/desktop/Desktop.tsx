import { ProgramDefinition } from '@system/definitions/program.definition';
import { CSSProperties } from 'react';
import { Toolbar } from '@system-programs/desktop/Toolbar/Toolbar';
import { Box } from '@chakra-ui/react';
import { ProgramExecutionService } from '@system-services/program-execution/services/program-execution.service';
import { ProgramService } from '@system-services/program/services/program.service';

export const Desktop: ProgramDefinition<[ProgramExecutionService, ProgramService]> = ({
	dependencies
}) => {
	const [programExecutionService, programService] = dependencies ?? [];

	const tempAdd = () => {
		console.info('run program', 'desktop');
		programExecutionService?.executeProgram('desktop')
	}
	return (
		<Box style={style} onClick={tempAdd}>
			<Toolbar dependencies={dependencies} />
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
