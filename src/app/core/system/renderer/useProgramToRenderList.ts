import { useEffect, useRef, useState } from 'react';
import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';
import { system } from '@system/system';
import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { useMount } from '@ui/utils/lifecycle/useMount';

export function useProgramToRenderList() {
	const [manifests, setManifests] = useState<ProgramInstanceManifest<InjectableServiceImpl[]>[]>(
		[]
	);

	useMount(() => {
		const unsubscribeAddEvent = system.programInstanceManager.subscribe(
			'add',
			(manifests) => {
				setManifests((prevManifests) => [...prevManifests, ...manifests]);
			}
		);
		const unsubscribeRemoveEvent = system.programInstanceManager.subscribe(
			'remove',
			(manifests) => {
				setManifests((prevManifests) => [
					...prevManifests.filter(
						(it) => !manifests.map((it) => it.pid).includes(it.pid)
					)
				]);
			}
		);
		return () => {
			system.programInstanceManager.removeAll();
			unsubscribeAddEvent?.();
			unsubscribeRemoveEvent?.();
		};
	});

	return manifests;
}
