import { ProgramDefinition } from '@system/definitions/program.definition';
import { ResourceService } from '@services/resource/services/resource.service';
import {
	ResourceArgs,
	ResourceDefinition
} from '@system/definitions/resource.definition';
import { useRef, useState } from 'react';
import { argsToObject } from '@system/utils/args/argsToObject';
import { isTextFile } from '@system/utils/resources/type/isTextFile';
import { Button } from '@ui/core/buttons/Button';
import { Group } from '@ui/core/group/Group';
import {
	ResourcePicker,
	ResourcePickerApi
} from '@ui/resource-tree/picker/ResourcePicker';

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
	const resourcePickerApi = useRef<ResourcePickerApi>(null);

	const handleResourcePickerClick = () => {
		resourcePickerApi.current?.open(setDefinition, { pid, type: 'txt' });
	};

	return (
		<div>
			{definition && isTextFile(definition) ? (
				<div dangerouslySetInnerHTML={{ __html: definition.content }}></div>
			) : (
				<>
					<Group position="center">
						<Button onClick={handleResourcePickerClick}>Open text file</Button>
					</Group>
					<ResourcePicker ref={resourcePickerApi} />
				</>
			)}
		</div>
	);
};
