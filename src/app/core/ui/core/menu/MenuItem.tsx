import {Menu as _Component, MenuItemProps as _Props} from '@mantine/core';
import {PropsWithOptionalOnClick, PropsWithStyleFunction} from '@ui/ui.definition';
import {FC} from 'react';

interface MenuItemProps
	extends WithOptionalChildren,
		PropsWithOptionalOnClick,
		PropsWithStyleFunction<_Props> {}

export const MenuItem: FC<MenuItemProps> = ({ style, ...props }) => {
	return <_Component.Item sx={style} {...props} />;
};
