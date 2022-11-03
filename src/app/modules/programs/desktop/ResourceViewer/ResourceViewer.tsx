import { ResourceTreeViewer } from '@ui/resource-tree-viewer/ResourceTreeViewer';
import { FC } from 'react';
import { Box } from '@ui/core/box/Box';
import { StyleWithTheme } from '@ui/ui.definition';
import { ResourceDefinition } from '@system/definitions/resource.definition';
import { WithServices } from '@system/definitions/program.definition';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';
import { ProgramService } from '@services/program/services/program.service';
import { WindowService } from '@services/window/services/window.service';

export const ResourceViewer: FC<
	WithServices<[ProgramInstanceService, ProgramService, WindowService]>
> = ({ dependencies }) => {
	const [programInstanceService] = dependencies ?? [];

	const handleClick = (resource: ResourceDefinition) => {
		programInstanceService?.openResource(resource);
	};

	return (
		<Box style={wrapperStyle}>
			<ResourceTreeViewer path="/desktop" onClick={handleClick} />
		</Box>
	);
};

const wrapperStyle: StyleWithTheme = ({ spacing }) => ({
	padding: spacing.lg
});
