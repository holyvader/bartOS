import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';
import { WindowPosition } from '@ui/program-wrappers/window/definition/window.definition';

interface EventPositionChange {
	type: 'position';
	data: { position: WindowPosition; pid: ProgramInstanceManifest['pid'] };
}

interface WindowProgram extends ProgramInstanceManifest {
	wid: string;
}

class WindowManagerService {
	private windowId = 0;

	private observable = new ObservableService<
		WindowProgram,
		EventPositionChange
	>('pid');

	getInitialPosition(): WindowPosition {
		if (this.observable.getAll().length === 0) {
			this.windowId = 0;
		}
		return {
			top: this.windowId * 10 + 20,
			left: this.windowId * 10 + 20,
			height: 200,
			width: 200
		};
	}

	add(manifest: ProgramInstanceManifest) {
		this.observable.add([this.toWindowProgram(manifest)]);
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
				console.info('change position', data, pid);
				cb(data.position);
			}
		});
	}

	changePosition(pid: string, position: WindowPosition) {
		this.observable.triggerEvent({
			type: 'position',
			data: {
				pid,
				position
			}
		});
	}

	toWindowProgram(manifest: ProgramInstanceManifest): WindowProgram {
		return {
			...manifest,
			wid: `w-${this.windowId++}`
		};
	}
}

export const windowManagerService = new WindowManagerService();
