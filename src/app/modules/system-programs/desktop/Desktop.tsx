import { ProgramDefinition } from '@system/definitions/program.definition';
import { CSSProperties } from 'react';
import { Toolbar } from '@system-programs/desktop/Toolbar';
import { Box } from '@chakra-ui/react';
import { ProgramExecutionService } from '@system-services/program-execution/services/program-execution.service';

export const Desktop: ProgramDefinition<[ProgramExecutionService]> = ({
	dependencies
}) => {
	const [programExecutionService] = dependencies ?? [];
	console.info('dependencies', programExecutionService?.test());
	return (
		<Box style={style}>
			<Toolbar />
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
