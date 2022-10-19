import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';

export interface ModuleServiceDefinition {
	new (name: ModuleServiceName): ModuleServiceImpl;
}

export interface ServiceImpl {
	init(): void;
}

export interface ModuleServiceImpl extends ServiceImpl {
	name: ModuleServiceName;
}
