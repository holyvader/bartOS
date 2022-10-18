import {
	ProgramDefinition,
	WithServices
} from '@system/definitions/program.definition';
import { CSSProperties, FC } from 'react';
import { Box } from '@chakra-ui/react';
import { ProgramExecutionService } from '@system-services/program-execution/services/program-execution.service';
import { ProgramService } from '@system-services/program/services/program.service';
import { TaskbarItem } from '@system-programs/desktop/Taskbar/ui/TaskbarItem/TaskbarItem';
import { useProgramList } from '@system-services/program/hooks/useProgramList';

interface TaskbarProps {
	programInstances: { id: string }[];
}

export const Taskbar: FC<
	TaskbarProps & WithServices<[ProgramExecutionService, ProgramService]>
> = ({ dependencies, programInstances }) => {
	const [programExecutionService, programService] = dependencies ?? [];
	const manifests = useProgramList(programService);
	return (
		<Box bg="gray.200" style={style} padding="2">
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
