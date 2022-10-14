import { useEffect, useRef, useState } from 'react';
import { RenderedProgramManifest } from '@system/definitions/program-manifest.definition';
import { system } from '@system/system';

export function useProgramToRenderList() {
	const [manifests, setManifests] = useState<RenderedProgramManifest<any>[]>(
		[]
	);
	const initialized = useRef(false);

	useEffect(() => {
		let unsubscribeAddEvent: () => void;
		let unsubscribeRemoveEvent: () => void;
		if (!initialized.current) {
			unsubscribeAddEvent = system.subscribeToExecutedPrograms(
				'add',
				(manifests) => {
					setManifests((prevManifests) => [...prevManifests, ...manifests]);
				}
			);
			unsubscribeRemoveEvent = system.subscribeToExecutedPrograms(
				'remove',
				(manifests) => {
					setManifests((prevManifests) => [
						...prevManifests.filter(
							(it) => !manifests.map((it) => it.pid).includes(it.pid)
						)
					]);
				}
			);

			initialized.current = true;
		}
		return () => {
			unsubscribeAddEvent?.();
			unsubscribeRemoveEvent?.();
		};
	}, []);

	return manifests;
}
