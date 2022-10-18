import React, { CSSProperties } from 'react';
import { SystemButton } from '@ui/core/buttons/SystemButton';

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
		<SystemButton
			onClick={() => {
				onClick?.(id);
			}}
			style={style}>
			{title}[{instanceNo}]
		</SystemButton>
	);
};
