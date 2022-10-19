import { ProgramDefinition, ProgramType } from './program.definition';
import { ModuleServiceImpl } from '@system/definitions/module-service.definition';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';

export { ProgramType };

interface ProgramManifestOptions<SERVICES extends ModuleServiceImpl[]> {
	id: string;
	title: string;
	type: ProgramType;
	definition: ProgramDefinition<SERVICES>;
	dependencies?: ModuleServiceImpl['name'][];
	runOnStartup?: boolean;
	userExecutable?: boolean;
}

export interface ProgramInstanceManifest<
	SERVICES extends ModuleServiceImpl[] = ModuleServiceImpl[]
> extends ProgramManifest<SERVICES> {
	pid: string;
}

export type ProgramManifest<
	SERVICES extends ModuleServiceImpl[] = ModuleServiceImpl[]
> = ProgramManifestOptions<SERVICES>;

export function programManifestDefinition<SERVICES extends ModuleServiceImpl[]>(
	options: ProgramManifestOptions<SERVICES>
): ProgramManifest<SERVICES> {
	return options;
}
