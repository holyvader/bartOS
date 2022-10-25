import { FC } from 'react';
import { Button as _Component, ButtonProps as _Props } from '@mantine/core';
import {
	PropsWithColor,
	PropsWithStyleFunction,
	PropsWithOptionalOnClick
} from '@ui/ui.definition';

interface ButtonProps
	extends WithOptionalChildren,
		PropsWithStyleFunction<_Props>,
		PropsWithColor,
		PropsWithOptionalOnClick {}

export const Button: FC<ButtonProps> = ({
	children,
	variant = 'filled',
	size = 'md',
	style,
	...props
}) => {
	return (
		<_Component variant={variant} size={size} {...props} radius="sm" sx={style}>
			{children}
		</_Component>
	);
};
