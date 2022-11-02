interface WithChildren {
	children: React.ReactNode;
}
type WithOptionalChildren = Partial<WithChildren>;

interface WithActions {
	onClick(event: React.MouseEvent): void;
	onMouseDown(event: React.MouseEvent): void;
	onMouseUp(event: React.MouseEvent): void;
	onKeyDown(event: React.KeyboardEvent): void;
	onKeyUp(event: React.KeyboardEvent): void;
	onFocus(event: React.FocusEvent): void;
	onBlur(event: React.FocusEvent): void;
}

type WithOptionalActions = Partial<WithActions>;
