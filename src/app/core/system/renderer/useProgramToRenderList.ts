import { useEffect, useRef, useState } from 'react';
import { RenderedProgramManifest } from '@system/definitions/program-manifest.definition';
import { system } from '@system/system';
import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { useMount } from '@ui/utils/lifecycle/useMount';

export function useProgramToRenderList() {
	const [manifests, setManifests] = useState<RenderedProgramManifest<InjectableServiceImpl[]>[]>(
		[]
	);

	useMount(() => {
		const unsubscribeAddEvent = system.executedProgramManager.subscribe(
			'add',
			(manifests) => {
				setManifests((prevManifests) => [...prevManifests, ...manifests]);
			}
		);
		const unsubscribeRemoveEvent = system.executedProgramManager.subscribe(
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
			system.executedProgramManager.removeAll();
			unsubscribeAddEvent?.();
			unsubscribeRemoveEvent?.();
		};
	});

	return manifests;
}
