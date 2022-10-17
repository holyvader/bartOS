import { FC } from 'react';
import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';

export interface ProgramDefinitionProps {
	onClose?(): void;
}

export enum ProgramType {
	WINDOW,
	PURE
}
export type ProgramDefinition<SERVICES extends InjectableServiceImpl[] = []> = FC<{
	dependencies?: SERVICES;
}>;
