import { CSSProperties, FC } from 'react';
import { Paper } from '@mantine/core';
import { WindowPosition } from '@system/definitions/window.definition';
import { Rnd } from 'react-rnd';
import { ProgramIcon } from '@system/definitions/program-manifest.definition';
import { TitleBar } from '@ui/program-wrappers/window/TitleBar';
import { useClickOutside } from '@mantine/hooks';
import { Box } from '@ui/core/box/Box';
import { StyleWithTheme } from '@ui/ui.definition';
import { WindowState } from '@system/services/window-manager/window-manager.service';
import { useBrowserWindowDimension } from '@ui/utils/browser-window/useBrowserWindowDimension';

interface WindowProps extends WithChildren {
	state: WindowState;
	title: string;
	icon?: ProgramIcon;
	pid: string;
	onPositionChange(position: WindowPosition): void;
	onFocus(): void;
	onMinimize(): void;
	onEnterFullScreen(): void;
	onExitFullScreen(): void;
	onBlur(): void;
	onClose(): void;
}

export const Window: FC<WindowProps> = ({
	children,
	state,
	onClose,
	onPositionChange,
	onFocus,
	onBlur,
	onMinimize,
	onEnterFullScreen,
	onExitFullScreen,
	title,
	pid
}) => {
	const browserWindowPosition = useBrowserWindowDimension();
	const ref = useClickOutside(() => {
		onBlur();
	});
	if (!state.visible) {
		return null;
	}

	return (
		<Rnd
			dragHandleClassName="title-bar"
			className={`window-${pid}`}
			style={{
				zIndex: state.zIndex
			}}
			disableDragging={state.fullScreen}
			onResizeStop={(e, dir, elementRef, delta, resizePosition) => {
				onPositionChange({
					top: resizePosition.y,
					left: resizePosition.x,
					width: state.position.width + delta.width,
					height: state.position.height + delta.height
				});
			}}
			onDragStop={(e, data) => {
				onPositionChange({
					top: data.y,
					left: data.x,
					width: state.position.width,
					height: state.position.height
				});
			}}
			position={{
				x: state.fullScreen ? browserWindowPosition.left : state.position.left,
				y: state.fullScreen ? browserWindowPosition.top : state.position.top
			}}
			size={{
				width: state.fullScreen
					? browserWindowPosition.width
					: state.position.width,
				height: state.fullScreen
					? browserWindowPosition.height
					: state.position.height
			}}>
			<Paper
				style={paperStyle(state.focused)}
				shadow={'lg'}
				withBorder
				ref={ref}
				onMouseDown={onFocus}
				radius={'sm'}>
				<TitleBar
					title={title}
					active={state.focused}
					fullScreen={state.fullScreen}
					onClose={onClose}
					onMinimize={onMinimize}
					onEnterFullScreen={onEnterFullScreen}
					onExitFullScreen={onExitFullScreen}
				/>
				<Box style={boxStyle}>{children}</Box>
			</Paper>
		</Rnd>
	);
};

const paperStyle = (isActive: boolean): CSSProperties => ({
	width: '100%',
	height: '100%',
	opacity: isActive ? 1 : 0.7,
	background: isActive ? undefined : '#ccc'
});

const boxStyle: StyleWithTheme = ({ spacing }) => ({
	padding: spacing.sm
});
