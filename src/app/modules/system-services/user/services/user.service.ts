import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';

export class UserService implements InjectableServiceImpl {
	constructor(public name: InjectableServiceName) {}
	init() {
		console.info('[userService] running. No users initialized');
	}
}
