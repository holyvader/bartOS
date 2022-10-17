import React from 'react';
import { SystemButton } from '@ui/core/buttons/SystemButton';

interface TaskbarItemProps {
	instanceNo: number;
	id: string;
	title: string;
	onClick?(id: string): void;
}

export const TaskbarItem: React.FC<TaskbarItemProps> = ({instanceNo, id, title, onClick}) => {
	return (<SystemButton onClick={() => {
		console.info('click?');
		onClick?.(id);
	}}>{title}[{instanceNo}]</SystemButton>);
};
