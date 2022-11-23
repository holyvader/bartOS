interface ScreenSize {
	width: number;
	height: number;
}
export function getScreenSize(): ScreenSize {
	return {
		width: window.innerWidth,
		height: window.innerHeight
	}
}
