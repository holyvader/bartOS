import { FC } from 'react';
import { CloseButton, Paper } from '@mantine/core';
import { WindowPosition } from '@system/definitions/window.definition';
import { Box } from '@ui/core/box/Box';
import { Rnd } from 'react-rnd';

interface WindowProps extends WithChildren {
	position: WindowPosition;
	visible: boolean;
	pid: string;
	onPositionChange(position: WindowPosition): void;
	onFocus(): void;
	onClose(): void;
}

export const Window: FC<WindowProps> = ({
	children,
	position,
	visible,
	onClose,
	onPositionChange,
	onFocus,
	pid
}) => {
	if (!visible) {
		return null;
	}
	return (
		<Rnd
			dragHandleClassName="title-bar"
			className={`window-${pid}`}
			style={{
				zIndex: position.zIndex
			}}
			onResizeStop={(e, dir, elementRef, delta, resizePosition) => {
				onPositionChange({
					top: resizePosition.y,
					left: resizePosition.x,
					width: position.width + delta.width,
					height: position.height + delta.height,
					zIndex: position.zIndex
				});
			}}
			onDragStop={(e, data) => {
				onPositionChange({
					top: data.y,
					left: data.x,
					width: position.width,
					height: position.height,
					zIndex: position.zIndex
				});
			}}
			position={{
				x: position.left,
				y: position.top
			}}
			size={{
				width: position.width,
				height: position.height
			}}>
			<Paper
				style={{
					width: '100%',
					height: '100%'
				}}
				shadow={'lg'}
				withBorder
				onMouseDown={onFocus}
				radius={'sm'}>
				<div style={{ cursor: 'move' }} className="title-bar">
					<Box sx={({ colors }) => ({ backgroundColor: colors.primary[9] })}>
						<CloseButton onClick={onClose} />
					</Box>
				</div>
				{children}
			</Paper>
		</Rnd>
	);
};
