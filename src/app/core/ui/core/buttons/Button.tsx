import { CSSProperties, FC, MouseEvent } from 'react';
import { Button as _Button, ButtonProps as _ButtonProps } from '@mantine/core';

interface ButtonProps extends WithChildren {
	size?: _ButtonProps['size'];
	variant?: _ButtonProps['variant'];
	color?: 'primary';
	style?: CSSProperties;
	className?: string;
	onClick?(e: MouseEvent): void;
}

export const Button: FC<ButtonProps> = ({
	children,
	variant = 'filled',
	size = 'md',
	color,
	onClick,
	style,
	className
}) => {
	return (
		<_Button
			variant={variant}
			size={size}
			color={color}
			onClick={onClick}
			style={style}
			className={className}>
			{children}
		</_Button>
	);
};
