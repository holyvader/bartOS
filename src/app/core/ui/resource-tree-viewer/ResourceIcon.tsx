import { ResourceType } from '@system/definitions/resource.definition';
import { IconFile, IconFileText, IconFolder } from '@ui/core/icons';
import { FC } from 'react';

interface ResourceIconProps {
	type: ResourceType;
	size?: number;
}

export const ResourceIcon: FC<ResourceIconProps> = ({ type, size }) => {
	const Icon = getIcon(type);
	return <Icon stroke={1} size={size} />;
};

function getIcon(type: ResourceType) {
	switch (type) {
		case 'dir':
			return IconFolder;
		case 'txt':
			return IconFileText;
	}
	return IconFile;
}
