import { ComponentType, FC } from 'react';
import { Window } from '@ui/program-wrappers/window/Window';
import { ProgramDefinitionProps } from '@system/definitions/program.definition';

export function withWindowProgramDefinition<
	PROPS extends Record<string, unknown>
>(Component: ComponentType<PROPS>): FC<PROPS & ProgramDefinitionProps> {
	return windowProgram;

	function windowProgram(props: PROPS & ProgramDefinitionProps) {
		return (
			<Window>
				<Component {...props} />
			</Window>
		);
	}
}
