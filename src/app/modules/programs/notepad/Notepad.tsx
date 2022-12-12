import {ResourceService} from '@services/resource/services/resource.service';
import {ProgramDefinition} from '@system/definitions/program.definition';
import {ResourceArgs, ResourceDefinition} from '@system/definitions/resource.definition';
import {argsToObject} from '@system/utils/args/argsToObject';
import {isTextFile} from '@system/utils/resources/type/isTextFile';
import {WindowMenu} from '@ui/program-wrappers/window/WindowMenu';
import {useState} from 'react';

export const Notepad: ProgramDefinition<[ResourceService]> = ({
	args,
	dependencies,
	pid
}) => {
	const [resourceService] = dependencies ?? [];
	const [definition, setDefinition] = useState<ResourceDefinition | undefined>(
		() => {
			const parsedArgs = args ? argsToObject<ResourceArgs>(args) : undefined;
			if (parsedArgs?.rid) {
				return resourceService?.get(parsedArgs?.rid);
			}
			return undefined;
		}
	);

	return (
		<div>
			<WindowMenu
				resourceService={resourceService}
				fileMenu={{ options: [{ label: 'Open file', pid, type: 'open-file', onSelect: setDefinition}]}} customMenus={[]}
			/>
			{definition && isTextFile(definition) ? (
				<div dangerouslySetInnerHTML={{ __html: definition.content }}></div>
			) : (
				<>

				</>
			)}
		</div>
	);
};
