import { FC } from 'react';
import { Button } from '@ui/core/buttons/Button';
import { StyleWithTheme } from '@ui/ui.definition';
import { Indicator } from '@ui/core/indicator/Indicator';
import { ProgramIcon } from '@system/definitions/program-manifest.definition';
import { WindowProgram } from '@system/definitions/window.definition';

interface TaskbarItemProps {
	id: string;
	title: string;
	icon?: ProgramIcon;
	style?: StyleWithTheme;
	windowInstances: WindowProgram[];
	onExecute(id: string): void;
	onToggle(id: string): void;
}

export const TaskbarItem: FC<TaskbarItemProps> = ({
	windowInstances,
	id,
	title,
	onExecute,
	onToggle,
	style,
	icon
}) => {
	const instanceNo = windowInstances.length;
	const someVisible = windowInstances.some((it) => it.state.visible);
	const handleClick = () => {
		if (!instanceNo) {
			onExecute(id);
		} else {
			onToggle(id);
		}
	};
	const Icon = icon ? icon : NoopIcon;
	return (
		<Indicator
			label={instanceNo}
			disabled={!instanceNo}
			inline
			size={14}
			offset={1}
			position="top-center"
			color="secondary">
			<Button
				onClick={handleClick}
				style={style}
				leftIcon={<Icon size={16} />}
				color="darkGrey"
				variant={instanceNo && someVisible ? 'filled' : 'outline'}>
				{title}
			</Button>
		</Indicator>
	);
};

const NoopIcon = () => null;
