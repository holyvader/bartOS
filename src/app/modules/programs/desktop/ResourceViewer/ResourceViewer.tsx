import { ResourceTreeViewer } from '@ui/resource-tree-viewer/ResourceTreeViewer';
import { FC } from 'react';
import { Box } from '@ui/core/box/Box';
import { StyleWithTheme } from '@ui/ui.definition';
import { ResourceDefinition } from '@system/definitions/resource.definition';
import { WithServices } from '@system/definitions/program.definition';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';
import { ProgramService } from '@services/program/services/program.service';
import { WindowService } from '@services/window/services/window.service';
import { isFolder } from '@system/utils/resources/type/isFolder';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';
import { objectToArgs } from '@system/utils/args/objectToArgs';
import { getFolderPath } from '@system/utils/resources/path/getFolderPath';

interface ResourceViewerProps {
	installedPrograms: ProgramManifest[];
}
export const ResourceViewer: FC<
	ResourceViewerProps &
		WithServices<[ProgramInstanceService, ProgramService, WindowService]>
> = ({ dependencies, installedPrograms }) => {
	const [programExecutionService] = dependencies ?? [];

	const handleClick = (resource: ResourceDefinition) => {
		const fileManager = installedPrograms.find(
			(it) => it.id === 'file-manager'
		);
		if (isFolder(resource) && fileManager) {
			programExecutionService?.execute(
				fileManager.id,
				objectToArgs({ path: getFolderPath(resource) })
			);
		}
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
