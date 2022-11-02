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
import { useColorScheme } from '@ui/utils/color-scheme/useColorScheme';
import { ActionIcon, IconMoon, IconSun } from '@ui/core/icons';

interface TaskbarProps {
	installedPrograms: ProgramManifest[];
	windowInstances: WindowProgram[];
}

export const Taskbar: FC<
	TaskbarProps &
		WithServices<[ProgramInstanceService, ProgramService, WindowService]>
> = ({ dependencies, windowInstances, installedPrograms }) => {
	const { toggleColorScheme, isDark } = useColorScheme();
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
						isDarkTheme={isDark}
						onExecute={(id) => programExecutionService?.execute(id)}
						onToggle={() => windowService?.toggle(instances[0]?.pid)}
						windowInstances={instances}
					/>
				);
			})}
			<ActionIcon
				variant="subtle"
				style={schemeToggleStyle}
				color={isDark ? 'lightGrey' : 'darkGrey'}
				onClick={() => toggleColorScheme()}>
				{isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
			</ActionIcon>
		</Box>
	);
};

const boxStyle: StyleWithTheme = ({ colors, spacing, colorScheme }) => ({
	background:
		colorScheme === 'light' ? colors.lightGrey[6] : colors.darkGrey[6],
	padding: spacing.sm,
	textAlign: 'center'
});

const itemStyle: StyleWithTheme = () => ({
	marginRight: 8
});

const schemeToggleStyle: StyleWithTheme = ({ radius }) => ({
	display: 'inline-block',
	textAlign: 'center',
	float: 'right',
	marginTop: 6,
	borderRadius: radius.sm
});
