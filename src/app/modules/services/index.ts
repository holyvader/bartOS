import programServiceManifest from './program/services/program.service.manifest';
import programInstanceServiceManifest from './program-instance/services/program-instance.service.manifest';
import resourceServiceManifest from './resource/services/resource.service.manifest';
import userServiceManifest from './user/services/user.service.manifest';
import windowServiceManifest from './window/services/window.service.manifest';

export const systemServiceManifests = [
	programServiceManifest,
	programInstanceServiceManifest,
	resourceServiceManifest,
	userServiceManifest,
	windowServiceManifest
];
