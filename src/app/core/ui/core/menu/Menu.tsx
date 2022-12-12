import {Menu as _Component, MenuProps as _Props} from '@mantine/core';
import {PropsWithColor, PropsWithOptionalOnClick} from '@ui/ui.definition';
import {FC} from 'react';

interface MenuProps
	extends WithOptionalChildren,
		PropsWithColor,
		PropsWithOptionalOnClick, _Props {}

export const Menu: FC<MenuProps> = ({ ...props }, ref) => {
	return <_Component {...props} />;
};
