import React, { CSSProperties } from 'react';
import { Button } from '@ui/core/buttons/Button';

interface TaskbarItemProps {
	instanceNo: number;
	id: string;
	title: string;
	style?: CSSProperties;
	onClick?(id: string): void;
}

export const TaskbarItem: React.FC<TaskbarItemProps> = ({
	instanceNo,
	id,
	title,
	onClick,
	style
}) => {
	return (
		<Button
			onClick={() => {
				onClick?.(id);
			}}
			style={style}>
			{title}[{instanceNo}]
		</Button>
	);
};
