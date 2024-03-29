import { FC } from 'react';
import {
	WindowPosition,
	WindowState
} from '@system/definitions/window.definition';
import { Rnd } from 'react-rnd';
import { ProgramIcon } from '@system/definitions/program-manifest.definition';
import { TitleBar } from '@ui/program-wrappers/window/TitleBar';
import { useClickOutside } from '@mantine/hooks';
import { Box } from '@ui/core/box/Box';
import { StyleWithTheme } from '@ui/ui.definition';
import { useBrowserWindowDimension } from '@ui/utils/browser-window/useBrowserWindowDimension';
import { classNameMerge } from '@ui/utils/classNameMerge';
import { Paper } from '@ui/core/paper/Paper';

const minHeight = 200;
const minWidth = 300;

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
			minHeight={minHeight}
			minWidth={minWidth}
			size={{
				width: state.fullScreen
					? browserWindowPosition.width
					: state.position.width,
				height: state.fullScreen
					? browserWindowPosition.height
					: state.position.height
			}}>
			<Paper
				style={paperStyle}
				className={classNameMerge({
					active: state.focused,
					fullScreen: state.fullScreen,
					windowMode: !state.fullScreen
				})}
				shadow={'lg'}
				withBorder
				ref={ref}
				onMouseDown={onFocus}>
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

const paperStyle: StyleWithTheme = ({ colors, colorScheme, radius }) => {
	return {
		transition: `all 0.1s ease-in-out`,
		width: '100%',
		height: '100%',
		opacity: 0.6,
		borderColor: 'transparent',
		borderRadius: radius.sm,
		background:
			colorScheme === 'light' ? colors.lightGrey[0] : colors.darkGrey[4],
		display: 'grid',
		gridTemplateRows: '48px minmax(0, 1fr)',

		'&.fullScreen': {
			animation: 'fullScreenFadeIn 0.2s ease-in-out',
			'@keyframes fullScreenFadeIn': {
				from: { opacity: 0 },
				to: { opacity: 1 }
			}
		},
		'&.windowMode': {
			animation: 'windowFadeIn 0.2s ease-in-out',
			'@keyframes windowFadeIn': {
				from: { opacity: 0 },
				to: { opacity: 1 }
			}
		},
		'&.active': {
			opacity: 1,
			background:
				colorScheme === 'light' ? colors.lightGrey[0] : colors.darkGrey[9]
		},

	};
};

const boxStyle: StyleWithTheme = ({ spacing }) => ({
	padding: spacing.sm,
	overflow: 'auto'
});
