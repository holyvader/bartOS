import { WindowPosition } from '@system/definitions/window.definition';

// todo calculate it dynamically later
const TASKBAR_HEIGHT = 58;

export function useBrowserWindowDimension(): WindowPosition {
	return {
		top: 0,
		left: 0,
		width: window.innerWidth,
		height: window.innerHeight - TASKBAR_HEIGHT
	};
}
