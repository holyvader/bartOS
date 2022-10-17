import { system } from '@system/system';
import { systemServiceManifests } from '@system-services/index';
import { systemProgramManifests } from '@system-programs/index';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';
import { useMount } from '@ui/utils/lifecycle/useMount';

export function useAppBoot() {
	useMount(() => {
		system.boot({
			systemServices: systemServiceManifests,
			systemPrograms: systemProgramManifests as unknown as ProgramManifest[], // todo refactor type mapping
			resources: []
		});
	});
}
