import { ProgramDefinition } from '@system/definitions/program.definition';
import { CSSProperties } from 'react';
import { Box } from '@chakra-ui/react';
import { useToolbarAppRegistry } from '@system-programs/desktop/Toolbar/useToolbarAppRegistry';
import { ProgramExecutionService } from '@system-services/program-execution/services/program-execution.service';
import { ProgramService } from '@system-services/program/services/program.service';

export const Toolbar: ProgramDefinition<[ProgramExecutionService, ProgramService]> = ({ dependencies }) => {
	const [programExecutionService, programService] = dependencies ?? [];

	const manifests = useToolbarAppRegistry(programService);
	console.info('manifests', manifests);
	return (
		<Box bg="gray.200" style={style}>
			Toolbar!
			{manifests.map( it => (<span key={it.id}>{it.title}</span>))}
		</Box>
	);
};

const style: CSSProperties = {
	position: 'fixed',
	height: 40,
	right: 0,
	bottom: 0,
	left: 0
};
