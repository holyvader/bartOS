import { useMount } from '@ui/utils/lifecycle/useMount';
import { useState } from 'react';
import { WindowService } from '@services/window/services/window.service';
import { WindowProgram } from '@system/definitions/window.definition';

export function useWindowList(windowService?: WindowService): WindowProgram[] {
	const [manifests, setManifests] = useState<WindowProgram[]>(
		windowService?.getAll() ?? []
	);

	useMount(() => {
		const unsubscribeAddEvent = windowService?.subscribe('add', (windows) => {
			setManifests((prevWindows) => [...prevWindows, ...windows]);
		});
		const unsubscribeChangeState = windowService?.subscribe(
			'state-change',
			() => {
				setManifests(() => {
					return windowService?.getAll() ?? [];
				});
			}
		);
		const unsubscribeRemoveEvent = windowService?.subscribe(
			'remove',
			(windows) => {
				setManifests((prevWindows) => [
					...prevWindows.filter(
						(it) => !windows.map((it) => it.pid).includes(it.pid)
					)
				]);
			}
		);

		return () => {
			unsubscribeAddEvent?.();
			unsubscribeRemoveEvent?.();
			unsubscribeChangeState?.();
		};
	});

	return manifests;
}
