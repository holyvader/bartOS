import { MouseEvent } from 'react';
import { MantineTheme } from '@mantine/styles/lib/theme/types/MantineTheme';
import { CSSObject } from '@mantine/core';

export type Color = 'primary' | 'secondary' | 'darkGrey' | 'lightGrey';
export type SystemTheme = MantineTheme;
export type StyleWithTheme = (theme: SystemTheme) => CSSObject;
export type PropsWithStyleFunction<PROPS> = Omit<
	PROPS,
	'sx' | 'style' | 'color'
> & {
	style?: StyleWithTheme;
};

export interface PropsWithColor {
	color?: Color;
}

export interface PropsWithOnClick<ELEMENT = HTMLElement> {
	onClick(e: MouseEvent<HTMLElement>): void;
}

export type PropsWithOptionalOnClick<ELEMENT = HTMLElement> = Partial<
	PropsWithOnClick<ELEMENT>
>;
