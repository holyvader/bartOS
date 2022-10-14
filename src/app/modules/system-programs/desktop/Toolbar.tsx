import { ProgramDefinition } from '@system/definitions/program.definition';
import { CSSProperties } from 'react';
import { Box } from '@chakra-ui/react';

export const Toolbar: ProgramDefinition = () => {
	return (
		<Box bg="gray.200" style={style}>
			Toolbar!
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
