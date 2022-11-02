import { system } from '@system/system';
import { systemServiceManifests } from '@services/index';
import { userResources } from '@user-home/index';
import { systemProgramManifests } from '@programs/index';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';
import { useMount } from '@ui/utils/lifecycle/useMount';

export function useAppBoot() {
	useMount(() => {
		return system.boot({
			systemServices: systemServiceManifests,
			systemPrograms: systemProgramManifests as unknown as ProgramManifest[], // todo refactor type mapping
			resources: userResources
		});
	});
}
