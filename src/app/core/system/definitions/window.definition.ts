import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';

export interface WindowPosition {
	top: number;
	left: number;
	width: number;
	height: number;
}

export interface WindowState {
	position: WindowPosition;
	visible: boolean;
	focused: boolean;
	fullScreen: boolean;
	zIndex: number;
}

export interface WindowProgram extends ProgramInstanceManifest {
	wid: string;
	state: WindowState;
}
