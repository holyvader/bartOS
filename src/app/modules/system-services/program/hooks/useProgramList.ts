import { useMount } from '@ui/utils/lifecycle/useMount';
import { ProgramService } from '@system-services/program/services/program.service';
import { useState } from 'react';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';

export function useProgramList(programService?: ProgramService): ProgramManifest[] {
	const [manifests, setManifests] = useState<ProgramManifest[]>(Array.from(programService?.getAll() ?? []).filter(onlyUserExecutable));

	useMount(() => {
		const unsubscribeAddEvent = programService?.subscribe(
			'add',
			(manifests) => {
				setManifests((prevManifests) => [...prevManifests, ...manifests.filter(onlyUserExecutable)]);
			}
		);
		const unsubscribeRemoveEvent = programService?.subscribe(
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
		}
	});

	return manifests;
}

function onlyUserExecutable(manifest: ProgramManifest): boolean {
	return !!manifest.userExecutable;
}
