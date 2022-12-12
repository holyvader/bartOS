import { FC, useState } from 'react';
import { Window } from '@ui/program-wrappers/window/Window';
import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';
import { useMount } from '@ui/utils/lifecycle/useMount';
import { system } from '@system/system';
import { SystemServiceName } from '@system/definitions/system-service.definition';
import { WindowState } from '@system/definitions/window.definition';

interface WindowWrapperProps extends WithChildren {
	manifest: ProgramInstanceManifest;
}

export const WindowWrapper: FC<WindowWrapperProps> = ({
	children,
	manifest
}) => {
	const [windowState, setWindowState] = useState<WindowState | undefined>(
		undefined
	);
	const programInstanceManager = system.systemServiceManager.getService(
		SystemServiceName.PROGRAM_INSTANCE_MANAGER
	);

	const windowManagerService = system.systemServiceManager.getService(
		SystemServiceName.WINDOW_MANAGER
	);

	useMount(() => {
		setWindowState(windowManagerService?.add(manifest));
		const unsubscribe = windowManagerService?.subscribeToStateChange(
			manifest.pid,
			(state) => {
				setWindowState(state);
			}
		);
		windowManagerService?.focus(manifest.pid);
		return () => {
			windowManagerService?.remove(manifest.pid);
			unsubscribe?.();
		};
	});
	if (!windowState) {
		return null;
	}
	return (
		<Window
			onClose={() => {
				programInstanceManager?.remove(manifest.pid);
			}}
			onPositionChange={(position) => {
				windowManagerService?.changePosition(manifest.pid, position);
			}}
			onFocus={() => {
				windowManagerService?.focus(manifest.pid);
			}}
			onBlur={() => {
				windowManagerService?.blur(manifest.pid);
			}}
			onMinimize={() => {
				windowManagerService?.toggleVisibility(manifest.pid);
			}}
			onEnterFullScreen={() => {
				windowManagerService?.enterFullScreen(manifest.pid);
			}}
			onExitFullScreen={() => {
				windowManagerService?.exitFullScreen(manifest.pid);
			}}
			state={windowState}
			title={manifest.title}
			pid={manifest.pid}>
			{children}
		</Window>
	);
};
