import { ProgramDefinition } from '@system/definitions/program.definition';
import { ResourceService } from '@services/resource/services/resource.service';
import {
	ResourceArgs,
	ResourceDefinition
} from '@system/definitions/resource.definition';
import { useState } from 'react';
import { argsToObject } from '@system/utils/args/argsToObject';
import { isTextFile } from '@system/utils/resources/type/isTextFile';

export const Notepad: ProgramDefinition<[ResourceService]> = ({
	args,
	dependencies
}) => {
	const [resourceService] = dependencies ?? [];
	const [definition] = useState<ResourceDefinition | undefined>(() => {
		const parsedArgs = args ? argsToObject<ResourceArgs>(args) : undefined;
		if (parsedArgs?.rid) {
			return resourceService?.get(parsedArgs?.rid);
		}
		return undefined;
	});

	return (
		<div>
			{definition && isTextFile(definition) ? (
				<div dangerouslySetInnerHTML={{ __html: definition.content }}></div>
			) : (
				''
			)}
		</div>
	);
};
