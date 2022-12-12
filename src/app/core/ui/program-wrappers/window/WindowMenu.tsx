import {ResourceService} from '@services/resource/services/resource.service';
import {ResourceDefinition} from '@system/definitions/resource.definition';
import {Button} from '@ui/core/buttons/Button';
import {Menu} from '@ui/core/menu/Menu';
import {MenuDropdown} from '@ui/core/menu/MenuDropdown';
import {MenuItem} from '@ui/core/menu/MenuItem';
import {MenuTarget} from '@ui/core/menu/MenuTarget';
import {ResourcePicker, ResourcePickerApi} from '@ui/resource-tree/picker/ResourcePicker';
import {FC, useRef} from 'react';

interface CustomMenuAction {
	type: 'custom',
	label: string;
	onSelect(): void;
}

interface OpenFileMenuAction {
	type: 'open-file',
	pid: string;
	label: string;
	onSelect(resource: ResourceDefinition): void;
}

interface Props {
	resourceService?: ResourceService;
	fileMenu?: { name?: string; options: [OpenFileMenuAction]};
	customMenus?: { name: string; options: CustomMenuAction[] }[];
}

export const WindowMenu: FC<Props> = ({ customMenus, fileMenu }) => {
	const resourcePickerApi = useRef<ResourcePickerApi>(null);
	const handleResourcePickerClick = () => {
		// todo hardcoded order - change it later
		if (fileMenu?.options[0].type === 'open-file') {
			resourcePickerApi.current?.open(fileMenu.options[0].onSelect, { pid: fileMenu.options[0].pid, type: 'txt' });
		}
	};

	return (<div>
		{!!fileMenu && <Menu>
			<MenuTarget>
				<Button>{fileMenu.name ?? 'File'}</Button>
			</MenuTarget>
			<MenuDropdown>
				<MenuItem onClick={handleResourcePickerClick}>{fileMenu.options[0].label}</MenuItem>
			</MenuDropdown>
		</Menu>}
		<ResourcePicker ref={resourcePickerApi} /></div>);
};
