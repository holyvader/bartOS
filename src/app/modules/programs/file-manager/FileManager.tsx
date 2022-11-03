import { ProgramDefinition } from '@system/definitions/program.definition';
import { ResourceTreeViewer } from '@ui/resource-tree-viewer/ResourceTreeViewer';
import {
	ResourceDefinition,
	ResourcePath
} from '@system/definitions/resource.definition';
import { useState } from 'react';
import { getFolderPath } from '@system/utils/resources/path/getFolderPath';
import { Breadcrumb } from '@programs/file-manager/breadcrumb/Breadcrumb';
import { FullHeightStickyTop } from '@ui/layouts/FullHeightStickyTop';
import { isFolder } from '@system/utils/resources/type/isFolder';
import { ArgsObject } from '@system/utils/args/args.definition';
import { argsToObject } from '@system/utils/args/argsToObject';
import { HOME_PATH } from '@system/utils/resources/path/homePath';

interface FileManagerArgs extends ArgsObject {
	path: ResourcePath;
}

export const FileManager: ProgramDefinition = ({ args }) => {
	const [path, setPath] = useState<ResourcePath>(
		args
			? (argsToObject(args) as FileManagerArgs)?.path ?? HOME_PATH
			: HOME_PATH
	);

	const handleClick = (resource: ResourceDefinition) => {
		if (isFolder(resource)) {
			setPath(getFolderPath(resource));
		}
	};
	return (
		<FullHeightStickyTop
			topHeight={42}
			top={<Breadcrumb path={path} onSetPath={setPath} />}>
			<ResourceTreeViewer path={path} onClick={handleClick} />
		</FullHeightStickyTop>
	);
};
