import { ProgramDefinition, ProgramType } from './program.definition';
import { ModuleServiceImpl } from '@system/definitions/module-service.definition';
import { SystemIcon, SystemIconProps } from '@ui/core/icons/icon.definition';
import { FC } from 'react';

export { ProgramType };
export type ProgramIcon = SystemIcon | FC<SystemIconProps>;

interface ProgramManifestOptions<SERVICES extends ModuleServiceImpl[]> {
	id: string;
	title: string;
	type: ProgramType;
	icon?: ProgramIcon;
	args?: string;
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
