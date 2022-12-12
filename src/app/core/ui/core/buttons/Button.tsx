import {Button as _Component, ButtonProps as _Props} from '@mantine/core';
import {PropsWithColor, PropsWithOptionalOnClick, PropsWithStyleFunction} from '@ui/ui.definition';
import {forwardRef} from 'react';

export interface ButtonProps
	extends WithOptionalChildren,
		PropsWithStyleFunction<_Props>,
		PropsWithColor,
		PropsWithOptionalOnClick {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
	children,
	variant = 'filled',
	size = 'md',
	style,
	...props
}, ref) => {
	return (
		<_Component ref={ref} variant={variant} size={size} {...props} radius="sm" sx={style}>
			{children}
		</_Component>
	);
});

Button.displayName = 'Button';
