import { ProgramDefinition } from '@system/definitions/program.definition';
import { Taskbar } from '@programs/desktop/Taskbar/Taskbar';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';
import { ProgramService } from '@services/program/services/program.service';
import { Box } from '@ui/core/box/Box';
import { WindowService } from '@services/window/services/window.service';
import { StyleWithTheme } from '@ui/ui.definition';
import { useWindowList } from '../../hooks/useWindowList';
import { useProgramList } from '../../hooks/useProgramList';

export const Desktop: ProgramDefinition<
	[ProgramInstanceService, ProgramService, WindowService]
> = ({ dependencies }) => {
	const [, programService, windowService] = dependencies ?? [];
	const manifests = useProgramList(programService);
	const windows = useWindowList(windowService);

	return (
		<Box style={style}>
			<Taskbar
				dependencies={dependencies}
				installedPrograms={manifests}
				windowInstances={windows}
			/>
		</Box>
	);
};

const style: StyleWithTheme = () => ({
	position: 'fixed',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
});
