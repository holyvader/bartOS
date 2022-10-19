import { WithServices } from '@system/definitions/program.definition';
import { CSSProperties, FC } from 'react';
import { ProgramExecutionService } from '@services/program-execution/services/program-execution.service';
import { ProgramService } from '@services/program/services/program.service';
import { TaskbarItem } from '@programs/desktop/Taskbar/ui/TaskbarItem/TaskbarItem';
import { useProgramList } from '../../../hooks/useProgramList';
import { Box } from '@ui/core/box/Box';

interface TaskbarProps {
	programInstances: { id: string }[];
}

export const Taskbar: FC<
	TaskbarProps & WithServices<[ProgramExecutionService, ProgramService]>
> = ({ dependencies, programInstances }) => {
	const [programExecutionService, programService] = dependencies ?? [];
	const manifests = useProgramList(programService);
	return (
		<Box
			style={style}
			sx={({ colors }) => ({ backgroundColor: colors.gray[0] })}>
			{manifests.map((it) => (
				<TaskbarItem
					key={it.id}
					id={it.id}
					title={it.title}
					style={{ marginRight: 8 }}
					onClick={(id) => programExecutionService?.execute(id)}
					instanceNo={
						programInstances.filter((instance) => instance.id === it.id).length
					}
				/>
			))}
		</Box>
	);
};

const style: CSSProperties = {
	position: 'fixed',
	right: 0,
	bottom: 0,
	left: 0
};
