import { ModuleServiceImpl } from '@system/definitions/module-service.definition';
import { system } from '@system/system';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';
import { SystemServiceName } from '@system/definitions/system-service.definition';
import { WindowManagerService } from '@system/services/window-manager/window-manager.service';

export class WindowService implements ModuleServiceImpl {
	private windowManager?: WindowManagerService;

	constructor(public name: ModuleServiceName) {
		this.windowManager = system.systemServiceManager.getService(
			SystemServiceName.WINDOW_MANAGER
		);
	}
	init() {
		console.info('[windowService] running');
	}

	toggle(pid?: string) {
		if (pid) {
			this.windowManager?.toggleVisibility(pid);
		}
	}

	subscribe: WindowManagerService['subscribe'] = (type, observer) => {
		return this.windowManager?.subscribe(type, observer) ?? (() => true);
	};

	getAll() {
		return this.windowManager?.getAll();
	}
}
