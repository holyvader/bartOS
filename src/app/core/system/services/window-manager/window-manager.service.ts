import { ProgramInstanceManifest } from '@system/definitions/program-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';
import {
	WindowPosition,
	WindowProgram,
	WindowState
} from '@system/definitions/window.definition';
import {getScreenSize} from '@system/utils/screen/size';

interface EventWindowStateChange {
	type: 'state-change';
	context: string[];
	data: {
		state: WindowState;
	};
}

export class WindowManagerService {
	private windowId = 0;

	private observable = new ObservableService<
		WindowProgram,
		EventWindowStateChange
	>('pid');

	add(
		manifest: ProgramInstanceManifest,
		onStateChange: (state: WindowState) => void
	) {
		const windowProgram = this.toWindowProgram(manifest);
		this.observable.add([windowProgram]);
		onStateChange(windowProgram.state);
		return this;
	}

	remove(pid: string) {
		this.observable.remove([pid]);
		return this;
	}

	getAll() {
		return this.observable.getAll();
	}

	subscribeToStateChange(pid: string, cb: (state: WindowState) => void) {
		return this.observable.contextSubscribe('replace', pid, (data) => {
			cb(data.state);
		});
	}

	subscribe: ObservableService<
		WindowProgram,
		EventWindowStateChange
	>['subscribe'] = (type, observer) => {
		return this.observable.subscribe(type, observer);
	};

	changePosition(pid: string, position: WindowPosition) {
		this.changeState(pid, { position });
		return this;
	}

	toggleVisibility(pid: string) {
		const windowProgram = this.observable.get(pid);
		if (windowProgram) {
			if (
				!windowProgram.state.visible ||
				windowProgram.state.zIndex < this.getMaxZIndex()
			) {
				this.focus(pid);
			} else {
				this.hide(pid);
			}
		}
		return this;
	}

	focus(pid: string) {
		const windowProgram = this.observable.get(pid);
		if (windowProgram) {
			const maxZIndex = this.getMaxZIndex();
			this.changeAllStates({
				focused: false
			});
			this.changeState(pid, {
				focused: true,
				visible: true,
				zIndex:
					windowProgram.state.zIndex === maxZIndex ? maxZIndex : maxZIndex + 1
			});
		}
		return this;
	}

	blur(pid: string) {
		this.changeState(pid, {
			focused: false
		});
		return this;
	}

	hide(pid: string) {
		this.changeState(pid, {
			focused: false,
			visible: false
		});
		return this;
	}

	enterFullScreen(pid: string) {
		this.changeState(pid, {
			fullScreen: true
		});
	}

	exitFullScreen(pid: string) {
		this.changeState(pid, {
			fullScreen: false
		});
	}

	changeState(pid: string, state: Partial<WindowState>) {
		const windowProgram = this.observable.get(pid);
		if (windowProgram) {
			const nextState = WindowManagerService.mergeState(
				state,
				windowProgram.state
			);
			this.observable.replace(pid, {
				...windowProgram,
				state: nextState
			});
		}
		return this;
	}
	// todo optimize in the future to trigger just one event instead of for each subscriber. Leave for now
	changeAllStates(state: Partial<WindowState>) {
		this.observable.getAll().forEach((it) => {
			this.changeState(it.pid, state);
		});
		return this;
	}

	static mergeState(
		nextState: Partial<WindowState>,
		prevState: WindowState
	): WindowState {
		return {
			...prevState,
			...nextState,
			position: {
				...prevState.position,
				...nextState.position
			}
		};
	}

	getMaxZIndex(): number {
		const allWindows = this.observable.getAll();
		return allWindows.reduce<number>((acc, it) => {
			return acc < it.state.zIndex ? it.state.zIndex : acc;
		}, 1);
	}

	getWindowPosition(width: number, height: number): { top: number; left: number } {
		const screenSize = getScreenSize();
		// Super quick. TODO later, better find algorithm. Finding free space is not that easy.
		const allWindowHorizontalPositions = this.observable.getAll().map( it => [it.state.position.left, it.state.position.left + it.state.position.width]) as Range[];
		const mergedHorizontalPositions = allWindowHorizontalPositions
			.reduce<Range[]>(mergeHorizontalRanges, [])
			.sort(([x1], [x2]) => x1 - x2);


		const min = mergedHorizontalPositions[0]?.[0] ?? 10;
		const max = mergedHorizontalPositions[mergedHorizontalPositions.length - 1]?.[1] ?? screenSize.width - 10;
		const free: Range[] = [
			[0, min],
			[max, screenSize.width]
		]
		mergedHorizontalPositions.forEach((range, index) => {
			if (index > 0) {
				free.push([mergedHorizontalPositions[index - 1][1], range[0]])
			}
		});
		const freeRange = free.find(([x1, x2]) => {
			const diff = x2 - x1;
			return diff > width;
		})
		return freeRange ? {
				top: this.windowId * 10 + 20,
				left: freeRange[0] + 20
			} : {
			top: this.windowId * 10 + 20,
			left: this.windowId * 10 + 20,
		}
	}


	toWindowProgram(manifest: ProgramInstanceManifest): WindowProgram {
		// will get viewport size and calculate window position based on that
		const maxZIndex = this.getMaxZIndex();
		console.info(this.getWindowPosition(100, 200));
		return {
			...manifest,
			wid: `w-${this.windowId++}`,
			state: {
				zIndex: maxZIndex + 1,
				visible: true,
				focused: true,
				fullScreen: false,
				position: {
					height: 400,
					width: 500,
					...this.getWindowPosition(500, 400)
				}
			}
		};
	}
}

type Range = [x1: number, x2: number];

function isBetweenRange(range1: Range, range2: Range): boolean {
	return ( range2[0] >= range1[0] && range2[0] <= range1[1]) || (range2[1] >= range1[0] && range2[1] <= range1[1]);
}

function mergeRange(range1: Range, range2: Range): Range {
	return [Math.min(range1[0], range2[0]), Math.max(range1[1], range2[1])]
}

function mergeHorizontalRanges(acc: Range[], currentRange: Range) {
	if (!acc.length) {
		return [currentRange]
	}
	const index = acc.findIndex((el) => isBetweenRange(el, currentRange));
	if (index !== -1) {
		acc[index] = mergeRange(acc[index], currentRange)
	} else {
		acc.push(currentRange);
	}
	return acc;
}
