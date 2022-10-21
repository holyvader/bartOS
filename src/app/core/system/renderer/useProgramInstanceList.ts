import { useState } from 'react';
import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';
import { system } from '@system/system';
import { useMount } from '@ui/utils/lifecycle/useMount';
import { SystemServiceName } from '@system/definitions/system-service.definition';

export function useProgramInstanceList() {
	const [manifests, setManifests] = useState<ProgramInstanceManifest[]>([]);

	useMount(() => {
		const service = system.systemServiceManager.getService(
			SystemServiceName.PROGRAM_INSTANCE_MANAGER
		);

		const unsubscribeAddEvent = service?.subscribe('add', (manifests) => {
			console.info('add', manifests);
			setManifests((prevManifests) => [...prevManifests, ...manifests]);
		});

		const unsubscribeRemoveEvent = service?.subscribe('remove', (manifests) => {
			console.info('removing', manifests);
			setManifests((prevManifests) => [
				...prevManifests.filter(
					(it) => !manifests.map((it) => it.pid).includes(it.pid)
				)
			]);
		});
		return () => {
			service?.removeAll();
			unsubscribeAddEvent?.();
			unsubscribeRemoveEvent?.();
		};
	});
	console.info('instance manifests', manifests);
	return manifests;
}
