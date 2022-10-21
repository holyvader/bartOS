import { WithServices } from '@system/definitions/program.definition';
import { CSSProperties, FC } from 'react';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';
import { ProgramService } from '@services/program/services/program.service';
import { TaskbarItem } from '@programs/desktop/Taskbar/ui/TaskbarItem/TaskbarItem';
import { useProgramList } from '../../../hooks/useProgramList';
import { Box } from '@ui/core/box/Box';
import { WindowService } from '@services/window/services/window.service';

interface TaskbarProps {
	programInstances: { id: string; pid: string }[];
}

export const Taskbar: FC<
	TaskbarProps &
		WithServices<[ProgramInstanceService, ProgramService, WindowService]>
> = ({ dependencies, programInstances }) => {
	const [programExecutionService, programService, windowService] =
		dependencies ?? [];
	const manifests = useProgramList(programService);
	return (
		<Box
			style={style}
			sx={({ colors }) => ({ backgroundColor: colors.gray[0] })}>
			{manifests.map((it) => {
				const instances = programInstances.filter(
					(instance) => instance.id === it.id
				);
				return (
					<TaskbarItem
						key={it.id}
						id={it.id}
						title={it.title}
						style={{ marginRight: 8 }}
						onExecute={(id) => programExecutionService?.execute(id)}
						onToggle={() => windowService?.toggle(instances[0]?.pid)}
						instanceNo={instances.length}
					/>
				);
			})}
		</Box>
	);
};

const style: CSSProperties = {
	position: 'fixed',
	right: 0,
	bottom: 0,
	left: 0
};
