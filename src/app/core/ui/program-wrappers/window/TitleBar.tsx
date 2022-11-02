import { Box } from '@ui/core/box/Box';
import { Css, StyleWithTheme } from '@ui/ui.definition';
import { CSSProperties, FC } from 'react';
import { classNameMerge } from '@ui/utils/classNameMerge';
import {
	IconMinus,
	IconArrowsDiagonalMinimize2,
	IconArrowsDiagonal,
	ActionIcon
} from '@ui/core/icons';
import { CloseButton } from '@ui/core/buttons/CloseButton';
import { Title } from '@ui/core/typography/Title';
import { Group } from '@ui/core/group/Group';

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
	return (
		<Box style={titleBarStyle} className="title-bar">
			<Box style={boxStyle} className={classNameMerge({ active })}>
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
		</Box>
	);
};

const boxStyle: StyleWithTheme = ({ colors, radius, colorScheme }) => ({
	transition: 'all 0.2s ease-in-out',
	height: 48,
	borderRadius: `${radius.sm}px ${radius.sm}px 0 0 `,
	position: 'relative',
	textAlign: 'center',
	'&.active:hover': {
		background:
			colorScheme === 'light' ? colors.lightGrey[6] : colors.darkGrey[6]
	}
});

const titleBarStyle: StyleWithTheme = ({ radius }) => ({
	cursor: 'move'
});

const titleStyle: Css = {
	lineHeight: `48px`
};

const actionWrapperStyle: CSSProperties = {
	position: `absolute`,
	right: 10,
	top: 10,
	whiteSpace: 'nowrap'
};
