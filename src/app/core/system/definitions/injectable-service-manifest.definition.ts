import {
	InjectableServiceDefinition,
	InjectableServiceImpl
} from '@system/definitions/injectable-service.definition';

export enum InjectableServiceName {
	PROGRAM = 'program',
	PROGRAM_EXECUTION = 'program-execution',
	RESOURCE = 'resource',
	USER = 'user'
}

interface InjectableServiceManifestOptions {
	id: InjectableServiceName;
	system?: boolean;
	injectable?: boolean;
	definition: InjectableServiceDefinition;
}

export type InjectableServiceManifest = InjectableServiceManifestOptions;

export function injectableServiceManifestDefinition(
	options: InjectableServiceManifestOptions
): InjectableServiceManifest {
	return options;
}
