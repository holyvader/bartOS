import { useEffect, useRef, useState } from 'react';
import { RenderedProgramManifest } from '@system/definitions/program-manifest.definition';
import { system } from '@system/system';
import { InjectableServiceManifest } from '@system/definitions/injectable-service-manifest.definition';

export function useInjectableServiceList() {
	const [manifests, setManifests] = useState<InjectableServiceManifest[]>([]);
	const initialized = useRef(false);

	useEffect(() => {
		let unsubscribeAddEvent: () => void;
		let unsubscribeRemoveEvent: () => void;
		if (!initialized.current) {
			console.info('services', Array.from(system.services.getAll()));
			setManifests(Array.from(system.services.getAll()));
			initialized.current = true;
		}
		return () => {
			unsubscribeAddEvent?.();
			unsubscribeRemoveEvent?.();
		};
	}, []);

	return manifests;
}
