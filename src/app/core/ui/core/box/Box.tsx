import React from 'react';
import { Box as ChakraBox } from '@chakra-ui/react';

export const Box: React.FC<ExtractParams<typeof ChakraBox>> = (props) => {
	return (<ChakraBox {...props} />);
};
