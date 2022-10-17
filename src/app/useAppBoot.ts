import { system } from '@system/system';
import { systemServiceManifests } from '@system-services/index';
import { systemProgramManifests } from '@system-programs/index';
import { useEffect, useRef } from 'react';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';

export function useAppBoot() {
	const initialized = useRef(false);
	useEffect(() => {
		if (!initialized.current) {
			console.info('booting');
			system.boot({
				systemServices: systemServiceManifests,
				systemPrograms: systemProgramManifests as ProgramManifest[],
				resources: []
			});
			initialized.current = true;
		}
	}, []);
}
