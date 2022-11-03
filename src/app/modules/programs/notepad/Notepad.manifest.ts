import {
	programManifestDefinition,
	ProgramType
} from '@system/definitions/program-manifest.definition';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';
import { IconNotebook } from '@ui/core/icons';
import { Notepad } from '@programs/notepad/Notepad';
import { ResourceService } from '@services/resource/services/resource.service';

export default programManifestDefinition<[ResourceService]>({
	id: 'notepad',
	title: 'Notepad',
	type: ProgramType.WINDOW,
	icon: IconNotebook,
	definition: Notepad,
	dependencies: [ModuleServiceName.RESOURCE],
	userExecutable: true
});
