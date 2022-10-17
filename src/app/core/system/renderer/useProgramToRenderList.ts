import { useEffect, useRef, useState } from 'react';
import { RenderedProgramManifest } from '@system/definitions/program-manifest.definition';
import { system } from '@system/system';
import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';

export function useProgramToRenderList() {
	const [manifests, setManifests] = useState<RenderedProgramManifest<InjectableServiceImpl[]>[]>(
		[]
	);

	useEffect(() => {
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
			unsubscribeAddEvent?.();
			unsubscribeRemoveEvent?.();
		};
	}, []);

	return manifests;
}
