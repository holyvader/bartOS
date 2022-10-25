import { WithServices } from '@system/definitions/program.definition';
import { FC } from 'react';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';
import { ProgramService } from '@services/program/services/program.service';
import { TaskbarItem } from '@programs/desktop/Taskbar/ui/TaskbarItem/TaskbarItem';
import { Box } from '@ui/core/box/Box';
import { WindowService } from '@services/window/services/window.service';
import { StyleWithTheme } from '@ui/ui.definition';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';
import { WindowProgram } from '@system/definitions/window.definition';

interface TaskbarProps {
	installedPrograms: ProgramManifest[];
	windowInstances: WindowProgram[];
}

export const Taskbar: FC<
	TaskbarProps &
		WithServices<[ProgramInstanceService, ProgramService, WindowService]>
> = ({ dependencies, windowInstances, installedPrograms }) => {
	const [programExecutionService, , windowService] = dependencies ?? [];
	return (
		<Box style={boxStyle}>
			{installedPrograms.map((it) => {
				const instances = windowInstances.filter(
					(instance) => instance.id === it.id
				);
				return (
					<TaskbarItem
						key={it.id}
						id={it.id}
						title={it.title}
						icon={it.icon}
						style={itemStyle}
						onExecute={(id) => programExecutionService?.execute(id)}
						onToggle={() => windowService?.toggle(instances[0]?.pid)}
						windowInstances={instances}
					/>
				);
			})}
		</Box>
	);
};

const boxStyle: StyleWithTheme = ({ colors, spacing }) => ({
	backgroundColor: colors.primary[6],
	background: `${colors.primary[6]}`,
	position: 'fixed',
	right: 0,
	bottom: 0,
	left: 0,
	padding: spacing.sm,
	textAlign: 'center'
});

const itemStyle: StyleWithTheme = () => ({
	marginRight: 8
});
