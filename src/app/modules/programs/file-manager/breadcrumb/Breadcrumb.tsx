import { ResourcePath } from '@system/definitions/resource.definition';
import { FC } from 'react';
import { pathToArray } from '@system/utils/resources/path/pathToArray';
import {
	getParentPath,
	getSubPath
} from '@system/utils/resources/path/getSubPath';
import { isHomePath } from '@system/utils/resources/path/isHomePath';
import { IconArrowUp, IconHome } from '@ui/core/icons';
import { Button, ButtonProps } from '@ui/core/buttons/Button';
import { HOME_PATH } from '@system/utils/resources/path/homePath';
import { StyleWithTheme } from '@ui/ui.definition';
import { Box } from '@ui/core/box/Box';

interface BreadcrumbProps {
	path: ResourcePath;
	onSetPath(path: ResourcePath): void;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ path, onSetPath }) => {
	const pathArray = pathToArray(path);

	return (
		<Box>
			<Button
				{...commonButtonProps}
				variant="outline"
				onClick={() => onSetPath(getParentPath(path))}
				disabled={isHomePath(path)}>
				<IconArrowUp size={16} />
			</Button>

			<Button
				{...commonButtonProps}
				variant={isHomePath(path) ? 'white' : undefined}
				onClick={() => onSetPath(HOME_PATH)}>
				<IconHome size={16} />
			</Button>

			{pathArray.map((value, index) => {
				const isLast = index + 1 === pathArray.length;
				if (isLast) {
					return (
						<Button {...commonButtonProps} key={value + index} variant="white">
							{value}
						</Button>
					);
				}
				return (
					<Button
						key={value + index}
						{...commonButtonProps}
						onClick={() => onSetPath(getSubPath(path, index + 1))}>
						{value}
					</Button>
				);
			})}
		</Box>
	);
};

const buttonStyle: StyleWithTheme = () => ({
	marginRight: 8,
	verticalAlign: 'middle'
});

const commonButtonProps: ButtonProps = {
	size: 'xs',
	color: 'secondary',
	variant: 'filled',
	style: buttonStyle
};
