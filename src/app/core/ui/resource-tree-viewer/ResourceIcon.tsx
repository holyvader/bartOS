import { ResourceType } from '@system/definitions/resource.definition';
import { IconFileText, IconFile, ThemeIcon } from '@ui/core/icons';
import { FC } from 'react';
import { StyleWithTheme } from '@ui/ui.definition';

interface ResourceIconProps {
	type: ResourceType;
	size?: number;
}

export const ResourceIcon: FC<ResourceIconProps> = ({ type, size }) => {
	const Icon = getIcon(type);
	return (
		<ThemeIcon style={iconStyle} size={size}>
			<Icon />
		</ThemeIcon>
	);
};

const iconStyle: StyleWithTheme = ({ colorScheme, colors }) => ({
	color: colorScheme === 'light' ? colors.lightGrey[6] : colors.darkGrey[6],
	background: 'transparent'
});

function getIcon(type: ResourceType) {
	switch (type) {
		case 'txt':
			return IconFileText;
	}
	return IconFile;
}
