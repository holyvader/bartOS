import { FC } from 'react';
import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';

export interface ProgramDefinitionProps {
	onClose?(): void;
}

export enum ProgramType {
	WINDOW,
	PURE
}

export interface WithServices<SERVICES extends InjectableServiceImpl[] = []> {
	dependencies?: SERVICES;
}

export type ProgramDefinition<SERVICES extends InjectableServiceImpl[] = [], PROPS = Record<string, unknown>> = FC<PROPS & WithServices<SERVICES>>;
