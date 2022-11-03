import { Badge as _Component, BadgeProps as _Props } from '@mantine/core';
import {
	PropsWithColor,
	PropsWithOptionalOnClick,
	PropsWithStyleFunction
} from '@ui/ui.definition';
import { FC } from 'react';

interface BadgeProps
	extends WithOptionalChildren,
		PropsWithColor,
		PropsWithOptionalOnClick,
		PropsWithStyleFunction<_Props> {}

export const Badge: FC<BadgeProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
