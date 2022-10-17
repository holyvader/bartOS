import { useMount } from '@ui/utils/lifecycle/useMount';
import { ProgramService } from '@system-services/program/services/program.service';
import { useState } from 'react';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';

export function useToolbarAppRegistry(programService?: ProgramService): ProgramManifest[] {
	const [manifests, setManifests] = useState<ProgramManifest[]>(Array.from(programService?.getAll() ?? []).filter( it => it.userExecutable));

	console.info(Array.from(programService?.getAll() ?? []));
	useMount(() => {
		const unsubscribeFromEvent = programService?.subscribe(
			'from',
			(manifests) => {
				setManifests((prevManifests) => [...prevManifests, ...manifests.filter( it => it.userExecutable)]);
			}
		);
		const unsubscribeAddEvent = programService?.subscribe(
			'add',
			(manifests) => {
				setManifests((prevManifests) => [...prevManifests, ...manifests.filter( it => it.userExecutable)]);
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
			unsubscribeFromEvent?.();
			unsubscribeAddEvent?.();
			unsubscribeRemoveEvent?.();
		}
	});

	return manifests;

}
