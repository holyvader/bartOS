import React, { useState } from 'react';
import { Window } from '@ui/program-wrappers/window/Window';
import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';
import { useMount } from '@ui/utils/lifecycle/useMount';
import { windowManagerService } from '@ui/program-wrappers/window/services/window-manager.service';
import { system } from '@system/system';
import { SystemServiceName } from '@system/definitions/system-service.definition';
import { Button } from '@ui/core/buttons/Button';

interface WindowWrapperProps {
	children: any;
	manifest: ProgramInstanceManifest;
}

export const WindowWrapper: React.FC<WindowWrapperProps> = ({
	children,
	manifest
}) => {
	const [position, setPosition] = useState(
		windowManagerService.getInitialPosition()
	);
	const programInstanceManager = system.systemServiceManager.getService(
		SystemServiceName.PROGRAM_INSTANCE_MANAGER
	);

	useMount(() => {
		const removeFromRegistry = windowManagerService.add(manifest);
		const unsubscribeOnPositionChange =
			windowManagerService.subscribeToPositionChange(
				manifest.pid,
				(position) => {
					setPosition(position);
				}
			);
		return () => {
			removeFromRegistry();
			unsubscribeOnPositionChange();
		};
	});

	return (
		<Window
			onClose={() => {
				windowManagerService.remove(manifest.pid);
				programInstanceManager?.remove(manifest.pid);
			}}
			isOpen={true}
			pid={manifest.pid}
			position={position}>
			{children}
			<Button
				onClick={() => {
					windowManagerService.changePosition(manifest.pid, {
						left: position.left + 20,
						top: position.top,
						width: position.width,
						height: position.height
					});
				}}>
				Change position
			</Button>
		</Window>
	);
};
