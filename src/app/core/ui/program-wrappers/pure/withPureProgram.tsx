import { Component, ComponentType, FC } from 'react';
import { ProgramDefinitionProps } from '@system/definitions/program.definition';

export function withPureWrapper<PROPS extends Record<string, unknown>>(
	Component: ComponentType<PROPS>
): FC<PROPS & ProgramDefinitionProps> {
	return pureProgram;

	function pureProgram(props: PROPS & ProgramDefinitionProps) {
		return <Component {...props} />;
	}
}
