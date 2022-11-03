import { StyleWithTheme } from '@ui/ui.definition';
import { FC } from 'react';
import { ResourceType } from '@system/definitions/resource.definition';
import { ResourceIcon } from '@ui/resource-tree-viewer/ResourceIcon';
import { Box } from '@ui/core/box/Box';

interface ResourceItemProps {
	name: string;
	type: ResourceType;
	onClick(): void;
}

export const ResourceItem: FC<ResourceItemProps> = ({
	type,
	name,
	onClick
}) => {
	const displayName = type === 'dir' ? name : `${name}.${type}`;
	return (
		<Box style={itemStyle} onClick={onClick}>
			<div>
				<ResourceIcon type={type} size={48} />
			</div>
			<div>{displayName}</div>
		</Box>
	);
};

const itemStyle: StyleWithTheme = ({
	colors,
	fontSizes,
	radius,
	colorScheme
}) => ({
	transition: 'all 0.15s ease-in-out',
	fontSize: fontSizes.md,
	cursor: 'pointer',
	width: 128,
	height: 128,
	textAlign: 'center',
	display: 'grid',
	gridTemplateRows: 'minmax(0, 1fr)  22px',
	justifyItems: 'center',
	alignItems: 'center',
	borderRadius: radius.md,
	'&:hover': {
		background: `${
			colorScheme === 'light' ? colors.lightGrey[9] : colors.darkGrey[6]
		}22`
	}
});
