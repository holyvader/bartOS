import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';

export class UserService implements InjectableServiceImpl {
	constructor(public name: InjectableServiceName) {}
	run() {
		console.info('[userService] running');
	}
}
