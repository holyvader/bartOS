import React from 'react';
import { Button } from '@chakra-ui/react';
import { ThemeTypings } from '@chakra-ui/styled-system';

interface SystemButtonProps {
	children: any;
	loading?: boolean;
	size?: ThemeTypings["components"]['Button']["sizes"];
	variant?: ThemeTypings["components"]['Button']["variants"],
	type?: "primary"
	onClick?(e: React.MouseEvent): void;
}

export const SystemButton: React.FC<SystemButtonProps> = ({ children, variant = 'solid', loading, size = 'md', type, onClick }) => {
	return (<Button variant={variant} isLoading={loading} size={size} colorScheme={type} onClick={onClick}>{children}</Button>);
};
