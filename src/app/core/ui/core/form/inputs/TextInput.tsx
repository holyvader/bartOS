import { FC } from 'react';
import {
	TextInput as _Component,
	TextInputProps as _Props
} from '@mantine/core';
import { PropsWithStyleFunction } from '@ui/ui.definition';

type TextInputProps = PropsWithStyleFunction<_Props>;

export const TextInput: FC<TextInputProps> = ({ style, ...props }) => {
	return <_Component {...props} sx={style} />;
};
