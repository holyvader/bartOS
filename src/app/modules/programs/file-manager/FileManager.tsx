import { ProgramDefinition } from '@system/definitions/program.definition';
import { ResourceTreeViewer } from '@ui/resource-tree-viewer/ResourceTreeViewer';
import {
	ResourceArgs,
	ResourceDefinition,
	ResourcePath
} from '@system/definitions/resource.definition';
import { useState } from 'react';
import { getFolderPath } from '@system/utils/resources/path/getFolderPath';
import { Breadcrumb } from '@programs/file-manager/breadcrumb/Breadcrumb';
import { FullHeightStickyTop } from '@ui/layouts/FullHeightStickyTop';
import { isFolder } from '@system/utils/resources/type/isFolder';
import { argsToObject } from '@system/utils/args/argsToObject';
import { HOME_PATH } from '@system/utils/resources/path/homePath';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';

export const FileManager: ProgramDefinition<[ProgramInstanceService]> = ({
	args,
	dependencies
}) => {
	const [programInstanceService] = dependencies ?? [];
	const [path, setPath] = useState<ResourcePath>(() => {
		const parsedArgs = args ? argsToObject<ResourceArgs>(args) : undefined;
		if (!parsedArgs) {
			return HOME_PATH;
		}
		return getFolderPath(parsedArgs);
	});

	const handleClick = (resource: ResourceDefinition) => {
		if (isFolder(resource)) {
			setPath(getFolderPath(resource));
		} else {
			programInstanceService?.openResource(resource);
		}
	};
	return (
		<FullHeightStickyTop
			topHeight={42}
			top={<Breadcrumb path={path} onSetPath={setPath} />}>
			{/* ResourceTreeViewer should verify user permissions */}
			<ResourceTreeViewer path={path} onClick={handleClick} />
		</FullHeightStickyTop>
	);
};
