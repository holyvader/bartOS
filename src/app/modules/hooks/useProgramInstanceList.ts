import { useMount } from '@ui/utils/lifecycle/useMount';
import { useState } from 'react';
import {
	ProgramInstanceManifest,
	ProgramManifest
} from '@system/definitions/program-manifest.definition';
import { ProgramExecutionService } from '@services/program-execution/services/program-execution.service';

export function useProgramInstanceList(
	programExecutionService?: ProgramExecutionService
): ProgramInstanceManifest[] {
	const [manifests, setManifests] = useState<ProgramInstanceManifest[]>(
		programExecutionService?.getAll() ?? []
	);

	useMount(() => {
		const unsubscribeAddEvent = programExecutionService?.subscribe(
			'add',
			(manifests) => {
				setManifests((prevManifests) => [
					...prevManifests,
					...manifests.filter(onlyUserExecutable)
				]);
			}
		);
		const unsubscribeRemoveEvent = programExecutionService?.subscribe(
			'remove',
			(manifests) => {
				setManifests((prevManifests) => [
					...prevManifests.filter(
						(it) => !manifests.map((it) => it.id).includes(it.id)
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
