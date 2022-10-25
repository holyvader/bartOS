import { Box } from '@ui/core/box/Box';
import {
	ActionIcon,
	CloseButton,
	CSSObject,
	Group,
	Title
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { SystemTheme } from '@ui/ui.definition';
import { CSSProperties, FC } from 'react';
import {
	IconMinus,
	IconArrowsDiagonal,
	IconArrowsDiagonalMinimize2
} from '@tabler/icons';

interface TitleBarProps {
	title: string;
	active: boolean;
	fullScreen: boolean;
	onClose(): void;
	onMinimize(): void;
	onEnterFullScreen(): void;
	onExitFullScreen(): void;
}

export const TitleBar: FC<TitleBarProps> = ({
	title,
	active,
	fullScreen,
	onClose,
	onMinimize,
	onEnterFullScreen,
	onExitFullScreen
}) => {
	const { hovered, ref } = useHover();
	return (
		<div style={titleBarStyle} className="title-bar" ref={ref}>
			<Box style={(theme) => boxStyle(theme, hovered && active)}>
				<Title order={6} style={titleStyle}>
					{title}
				</Title>
				<div style={actionWrapperStyle}>
					<Group position="right" spacing="sm">
						<ActionIcon
							onClick={onMinimize}
							color="darkGrey"
							variant="subtle"
							radius="xl">
							<IconMinus size={16} />
						</ActionIcon>
						{fullScreen ? (
							<ActionIcon
								onClick={onExitFullScreen}
								color="primary"
								variant="subtle"
								radius="xl">
								<IconArrowsDiagonalMinimize2 size={16} />
							</ActionIcon>
						) : (
							<ActionIcon
								onClick={onEnterFullScreen}
								color="primary"
								variant="subtle"
								radius="xl">
								<IconArrowsDiagonal size={16} />
							</ActionIcon>
						)}
						<CloseButton
							onClick={onClose}
							variant="subtle"
							color="secondary"
							radius="xl"
						/>
					</Group>
				</div>
			</Box>
		</div>
	);
};

const boxStyle = ({ colors }: SystemTheme, isFocused: boolean) =>
	({
		transition: 'background 0.3s ease-in-out',
		height: 48,
		position: 'relative',
		textAlign: 'center',
		'&:hover': {
			background: isFocused
				? `linear-gradient(180deg, ${colors.lightGrey[6]} 0%, ${colors.lightGrey[1]} 25%, ${colors.lightGrey[0]} 100%)`
				: undefined
		}
	} as CSSObject);

const titleBarStyle: CSSProperties = {
	cursor: 'move'
};

const titleStyle: CSSProperties = {
	lineHeight: `48px`
};

const actionWrapperStyle: CSSProperties = {
	position: `absolute`,
	right: 10,
	top: 10,
	whiteSpace: 'nowrap'
};
