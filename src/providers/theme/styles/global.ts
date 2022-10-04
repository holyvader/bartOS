import { StyleFunctionProps } from '@chakra-ui/styled-system';

export const global = (props: StyleFunctionProps) => {
	return {
		body: {
			bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
			color: props.colorMode === 'dark' ? 'gray.100' : 'gray.700'
		},
		a: {
			color: 'teal.500',
			_hover: {
				textDecoration: 'underline'
			}
		}
	};
};
