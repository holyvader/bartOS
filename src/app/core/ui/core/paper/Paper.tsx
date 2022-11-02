import { Paper as _Component, PaperProps as _Props } from '@mantine/core';
import { PropsWithColor, PropsWithStyleFunction } from '@ui/ui.definition';
import { forwardRef } from 'react';

interface PaperProps
	extends WithOptionalChildren,
		WithOptionalActions,
		PropsWithColor,
		PropsWithStyleFunction<_Props> {}

export const Paper = forwardRef<HTMLDivElement, PaperProps>(
	({ style, ...props }, ref) => {
		return <_Component ref={ref} {...props} sx={style} />;
	}
);

Paper.displayName = 'Paper';
