import { FC, useState } from 'react';
import { Window } from '@ui/program-wrappers/window/Window';
import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';
import { useMount } from '@ui/utils/lifecycle/useMount';
import { system } from '@system/system';
import { SystemServiceName } from '@system/definitions/system-service.definition';
import { WindowPosition } from '@system/definitions/window.definition';

interface WindowWrapperProps extends WithChildren {
	manifest: ProgramInstanceManifest;
}

export const WindowWrapper: FC<WindowWrapperProps> = ({
	children,
	manifest
}) => {
	const [position, setPosition] = useState<WindowPosition | undefined>();
	const [visible, setVisible] = useState<boolean>(true);
	const programInstanceManager = system.systemServiceManager.getService(
		SystemServiceName.PROGRAM_INSTANCE_MANAGER
	);

	const windowManagerService = system.systemServiceManager.getService(
		SystemServiceName.WINDOW_MANAGER
	);

	useMount(() => {
		const removeFromRegistry = windowManagerService?.add(manifest, setPosition);
		const unsubscribeOnPositionChange =
			windowManagerService?.subscribeToPositionChange(
				manifest.pid,
				(position) => {
					setPosition(position);
				}
			);
		const unsubscribeOnVisibilityChange =
			windowManagerService?.subscribeToVisibilityChange(
				manifest.pid,
				(visible) => {
					setVisible(visible);
				}
			);
		return () => {
			removeFromRegistry?.();
			unsubscribeOnPositionChange?.();
			unsubscribeOnVisibilityChange?.();
		};
	});
	if (!position) {
		return null;
	}
	return (
		<Window
			onClose={() => {
				windowManagerService?.remove(manifest.pid);
				programInstanceManager?.remove(manifest.pid);
			}}
			onPositionChange={(position) => {
				windowManagerService?.changePosition(manifest.pid, position);
			}}
			onFocus={() => {
				windowManagerService?.focus(manifest.pid);
			}}
			visible={visible}
			pid={manifest.pid}
			position={position}>
			{children}
		</Window>
	);
};
