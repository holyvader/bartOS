import { ProgramDefinition, ProgramType } from './program.definition';
import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';

export { ProgramType };

interface ProgramManifestOptions<SERVICES extends InjectableServiceImpl[]> {
	id: string;
	title: string;
	type: ProgramType;
	definition: ProgramDefinition<SERVICES>;
	dependencies?: InjectableServiceName[];
	runOnStartup?: boolean;
}

export interface RenderedProgramManifest<
	SERVICES extends InjectableServiceImpl[]
> extends ProgramManifest<SERVICES> {
	pid: string;
}

export type ProgramManifest<SERVICES extends InjectableServiceImpl[] = InjectableServiceImpl[]> =
	ProgramManifestOptions<SERVICES>;

export function programManifestDefinition<
	SERVICES extends InjectableServiceImpl[]
>(options: ProgramManifestOptions<SERVICES>): ProgramManifest<SERVICES> {
	return options;
}
