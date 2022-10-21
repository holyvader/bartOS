import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';
import { WindowPosition } from '@system/definitions/window.definition';

interface EventPositionChange {
	type: 'position';
	data: { position: WindowPosition; pid: ProgramInstanceManifest['pid'] };
}

interface EventVisibilityChange {
	type: 'visibility';
	data: { visible: boolean; pid: ProgramInstanceManifest['pid'] };
}

interface WindowProgram extends ProgramInstanceManifest {
	wid: string;
	position: EventPositionChange['data']['position'];
	visible: EventVisibilityChange['data']['visible'];
}

export class WindowManagerService {
	private windowId = 0;

	private observable = new ObservableService<
		WindowProgram,
		EventPositionChange | EventVisibilityChange
	>('pid');

	add(
		manifest: ProgramInstanceManifest,
		onPositionChange: (position: WindowPosition) => void
	) {
		const windowProgram = this.toWindowProgram(manifest);
		this.observable.add([windowProgram]);
		onPositionChange(windowProgram.position);
		return () => {
			this.remove(manifest.pid);
		};
	}

	remove(pid: string) {
		this.observable.remove([pid]);
	}

	subscribeToPositionChange(
		pid: string,
		cb: (position: WindowPosition) => void
	) {
		return this.observable.subscribe('position', (data) => {
			if (data.pid === pid) {
				cb(data.position);
			}
		});
	}

	changePosition(pid: string, position: WindowPosition) {
		const windowProgram = this.observable.get(pid);
		if (windowProgram) {
			this.observable.replace(pid, {
				...windowProgram,
				position
			});
			this.observable.triggerEvent({
				type: 'position',
				data: {
					pid,
					position
				}
			});
		}
	}

	subscribeToVisibilityChange(
		pid: string,
		cb: (visible: EventVisibilityChange['data']['visible']) => void
	) {
		return this.observable.subscribe('visibility', (data) => {
			if (data.pid === pid) {
				cb(data.visible);
			}
		});
	}

	changeVisibility(
		pid: string,
		visible: EventVisibilityChange['data']['visible']
	) {
		const windowProgram = this.observable.get(pid);
		if (windowProgram) {
			this.observable.replace(pid, {
				...windowProgram,
				visible
			});
			this.observable.triggerEvent({
				type: 'visibility',
				data: {
					pid,
					visible
				}
			});
		}
	}

	toggle(pid: string) {
		const windowProgram = this.observable.get(pid);
		if (windowProgram) {
			this.changeVisibility(pid, !windowProgram.visible);
		}
	}

	focus(pid: string) {
		const windowProgram = this.observable.get(pid);
		const allWindows = this.observable.getAll();
		const maxZIndex = allWindows.reduce<number>((acc, it) => {
			return acc < it.position.zIndex ? it.position.zIndex : acc;
		}, 1);
		if (windowProgram) {
			const position = {
				...windowProgram.position,
				zIndex:
					windowProgram.position.zIndex === maxZIndex
						? maxZIndex
						: maxZIndex + 1
			};
			this.changePosition(pid, position);
		}
	}

	toWindowProgram(manifest: ProgramInstanceManifest): WindowProgram {
		const allWindows = this.observable.getAll();
		const maxZIndex = allWindows.reduce<number>((acc, it) => {
			return acc < it.position.zIndex ? it.position.zIndex : acc;
		}, 1);
		return {
			...manifest,
			wid: `w-${this.windowId++}`,
			visible: true,
			position: {
				top: this.windowId * 10 + 20,
				left: this.windowId * 10 + 20,
				height: 200,
				width: 200,
				zIndex: maxZIndex + 1
			}
		};
	}
}
