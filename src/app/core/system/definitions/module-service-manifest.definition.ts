import { ModuleServiceDefinition } from '@system/definitions/module-service.definition';

export enum ModuleServiceName {
	PROGRAM = 'program',
	PROGRAM_EXECUTION = 'program-execution',
	WINDOW = 'window',
	RESOURCE = 'resource',
	USER = 'user'
}

interface ModuleServiceManifestOptions {
	id: ModuleServiceName;
	system?: boolean;
	injectable?: boolean;
	definition: ModuleServiceDefinition;
}

export type ModuleServiceManifest = ModuleServiceManifestOptions;

export function moduleServiceManifestDefinition(
	options: ModuleServiceManifestOptions
): ModuleServiceManifest {
	return options;
}
