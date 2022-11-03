import { useMount } from '@ui/utils/lifecycle/useMount';
import { useState } from 'react';
import {
	ProgramInstanceManifest,
	ProgramManifest
} from '@system/definitions/program-manifest.definition';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';

export function useProgramInstanceList(
	programInstanceService?: ProgramInstanceService
): ProgramInstanceManifest[] {
	const [manifests, setManifests] = useState<ProgramInstanceManifest[]>(
		programInstanceService?.getAll() ?? []
	);

	useMount(() => {
		const unsubscribeAddEvent = programInstanceService?.subscribe(
			'add',
			(manifests) => {
				setManifests((prevManifests) => [
					...prevManifests,
					...manifests.filter(onlyUserExecutable)
				]);
			}
		);
		const unsubscribeRemoveEvent = programInstanceService?.subscribe(
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
	});

	return manifests;
}

function onlyUserExecutable(manifest: ProgramManifest): boolean {
	return !!manifest.userExecutable;
}
