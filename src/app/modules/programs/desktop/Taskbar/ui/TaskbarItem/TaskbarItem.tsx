import { CSSProperties, FC, MouseEvent } from 'react';
import { Button } from '@ui/core/buttons/Button';

interface TaskbarItemProps {
	instanceNo: number;
	id: string;
	title: string;
	style?: CSSProperties;
	onExecute(id: string): void;
	onToggle(id: string): void;
}

export const TaskbarItem: FC<TaskbarItemProps> = ({
	instanceNo,
	id,
	title,
	onExecute,
	onToggle,
	style
}) => {
	const handleClick = (e: MouseEvent) => {
		e.persist();
		if (!instanceNo) {
			onExecute(id);
		} else {
			onToggle(id);
		}
	};

	return (
		<Button onClick={handleClick} style={style}>
			{title}[{instanceNo}]
		</Button>
	);
};
