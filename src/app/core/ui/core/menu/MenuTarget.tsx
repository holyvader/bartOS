import { Menu as _Component, MenuTargetProps as _Props } from '@mantine/core';
import {
	PropsWithColor,
	PropsWithOptionalOnClick
} from '@ui/ui.definition';
import {FC, forwardRef} from 'react';

interface MenuTargetProps
	extends WithChildren,
		PropsWithColor,
		PropsWithOptionalOnClick, _Props {}

export const MenuTarget = forwardRef<HTMLDivElement, MenuTargetProps>(({ ...props }, ref) => {
	return <_Component.Target ref={ref} {...props} />;
});

MenuTarget.displayName = 'MenuTarget';
