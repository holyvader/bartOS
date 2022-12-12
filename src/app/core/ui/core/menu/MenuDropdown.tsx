import {Menu as _Component, MenuDropdownProps as _Props} from '@mantine/core';
import {FC} from 'react';

interface MenuDropdownProps
	extends WithOptionalChildren,
		_Props {}

export const MenuDropdown: FC<MenuDropdownProps> = ({ ...props }) => {
	return <_Component.Dropdown {...props} />;
};

MenuDropdown.displayName = 'MenuDropdown';
