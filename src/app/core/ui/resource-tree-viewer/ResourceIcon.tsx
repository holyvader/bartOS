import { ResourceType } from '@system/definitions/resource.definition';
import { IconFileText, IconFile } from '@ui/core/icons';
import { FC } from 'react';

interface ResourceIconProps {
	type: ResourceType;
	size?: number;
}

export const ResourceIcon: FC<ResourceIconProps> = ({ type, size }) => {
	switch (type) {
		case 'txt':
			return <IconFileText size={size} color="white" />;
	}
	return <IconFile size={size} />;
};
