import React from 'react';
import { Dialog, Title } from '@mantine/core';
import { WindowPosition } from './definition/window.definition';

interface WindowProps {
	children: any;
	isOpen: boolean;
	position: WindowPosition;
	pid: string;
	onClose(): void;
}

export const Window: React.FC<WindowProps> = ({
	children,
	isOpen,
	position,
	onClose,
	pid
}) => {
	return (
		<Dialog
			opened={isOpen}
			onClose={onClose}
			position={position}
			shadow="xl"
			p={30}
			radius="sm"
			withCloseButton>
			<div id={pid} style={{ width: position.width, height: position.height }}>
				<Title order={1}>This is h1 title</Title>
				{children}
			</div>
		</Dialog>
	);
};
