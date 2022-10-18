import { ComponentType, FC } from 'react';
import { Window } from '@ui/program-wrappers/window/Window';
import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';

export function withWindowWrapper<PROPS extends Record<string, unknown>>(
	Component: ComponentType<PROPS>
): FC<PROPS & ProgramInstanceManifest> {
	return windowProgram;

	function windowProgram(props: PROPS & ProgramInstanceManifest) {
		return (
			<Window
				onClose={() => {
					console.info('close');
				}}
				isOpen={true}
				pid={props.pid}
				position={{ x: 0, y: 0, height: 100, width: 100 }}>
				<Component {...props} />
			</Window>
		);
	}
}
