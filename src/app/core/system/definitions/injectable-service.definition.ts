import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';

export interface InjectableServiceDefinition {
	new (name: InjectableServiceName): InjectableServiceImpl;
}

export interface ServiceImpl {
	init(): void;
}

export interface InjectableServiceImpl extends ServiceImpl {
	name: InjectableServiceName;
}
