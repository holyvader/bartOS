import { system } from '@system/system';
import { systemServiceManifests } from '@system-services/index';
import { systemProgramManifests } from '@system-programs/index';
import { useEffect } from 'react';

export function useAppBoot() {
	useEffect(() => {
		console.info('booting');
		system.services.register(systemServiceManifests);
		system.programs.register(systemProgramManifests);
		system.resources.register([]);
		system.boot();
	}, []);
}
