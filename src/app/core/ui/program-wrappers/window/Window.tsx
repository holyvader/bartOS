import React from 'react';
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react';

interface WindowPosition {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface WindowProps {
	children: any;
	isOpen: boolean;
	overlay?: boolean;
	position: WindowPosition;
	onClose(): void;
}

export const Window: React.FC<WindowProps> = ({
	children,
	isOpen,
	overlay,
	onClose
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			{overlay && <ModalOverlay />}
			<ModalContent>
				<ModalHeader>Modal Title</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{children}</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Close
					</Button>
					<Button variant="ghost">Secondary Action</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
