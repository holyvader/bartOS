import { ModuleServiceImpl } from '@system/definitions/module-service.definition';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';

export class UserService implements ModuleServiceImpl {
	constructor(public name: ModuleServiceName) {}
	init() {
		console.info('[userService] running. No users initialized');
	}
}
