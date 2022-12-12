import {
	ResourceDefinition,
	ResourcePath,
	ResourceType
} from '@system/definitions/resource.definition';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ResourceTreeBrowser } from '@ui/resource-tree/ResourceTreeBrowser';
import { Modal } from '@ui/core/modal/Modal';
import { Box } from '@ui/core/box/Box';
import { system } from '@system/system';
import { SystemServiceName } from '@system/definitions/system-service.definition';

interface ApiOptions {
	path?: ResourcePath;
	pid: string;
	type?: Exclude<ResourceType, 'dir'>;
}
export interface ResourcePickerApi {
	open(
		onSelectCallback: (resource: ResourceDefinition) => void,
		options: ApiOptions
	): void;
}

export const ResourcePicker = forwardRef<ResourcePickerApi>((props, ref) => {
	const onSelectCallback = useRef<(resource: ResourceDefinition) => void>();
	const windowManagerService = system.systemServiceManager.getService(
		SystemServiceName.WINDOW_MANAGER
	);
	const [initialOptions, setInitialOptions] = useState<ApiOptions>({ pid: '' });
	const [open, setOpen] = useState(false);

	const regainWindowFocus = () => {
		windowManagerService?.focus(initialOptions.pid);
	};

	useImperativeHandle<ResourcePickerApi, ResourcePickerApi>(ref, () => ({
		open(cb, options) {
			onSelectCallback.current = cb;
			setInitialOptions(options);
			setOpen(true);
		}
	}));

	return (
		<Modal
			opened={open}
			onClose={() => {
				setOpen(false);
				regainWindowFocus();
			}}>
			<Box style={{ height: 300 }}>
				<ResourceTreeBrowser
					path={initialOptions?.path}
					filterByType={initialOptions?.type}
					onClick={(resource) => {
						onSelectCallback.current?.(resource);
						setOpen(false);
						regainWindowFocus();
					}}
				/>
			</Box>
		</Modal>
	);
});

ResourcePicker.displayName = 'ResourcePicker';
