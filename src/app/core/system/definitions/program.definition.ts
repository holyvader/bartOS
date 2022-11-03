import { FC } from 'react';
import { ModuleServiceImpl } from '@system/definitions/module-service.definition';

export interface ProgramDefinitionProps {
	onClose?(): void;
}

export enum ProgramType {
	WINDOW,
	PURE
}

export interface WithServices<SERVICES extends ModuleServiceImpl[] = []> {
	dependencies?: SERVICES;
}

export interface WithArgs {
	args?: string;
}

export type ProgramDefinition<
	SERVICES extends ModuleServiceImpl[] = [],
	PROPS = Record<string, unknown>
> = FC<PROPS & WithServices<SERVICES> & WithArgs>;
