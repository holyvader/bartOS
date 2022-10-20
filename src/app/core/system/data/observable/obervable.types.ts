export interface ObservableEventBase {
	type: string;
}

export interface EventAdd<T> extends ObservableEventBase {
	type: 'add';
	data: T[];
}

export interface EventRemove<T> extends ObservableEventBase {
	type: 'remove';
	data: T[];
}

export interface EventReplace<T> extends ObservableEventBase {
	type: 'replace';
	data: T;
}

export type EventByType<
	EVENT extends ObservableEventBase,
	TYPE
> = EVENT extends {
	type: infer InferredT;
}
	? InferredT extends TYPE
		? EVENT
		: never
	: never;

export type BuiltInEventType = ObservableBuiltInEvent<unknown>['type'];
export type ObservableBuiltInEvent<T> =
	| EventAdd<T>
	| EventRemove<T>
	| EventReplace<T>;

export type AllObservableEvents<T, EVENT extends ObservableEventBase> =
	| EVENT
	| ObservableBuiltInEvent<T>;

export type ObservableEventData<
	T,
	EVENT extends ObservableEventBase = ObservableEventBase,
	TYPE extends EVENT['type'] | ObservableBuiltInEvent<T>['type'] =
		| EVENT['type']
		| ObservableBuiltInEvent<T>['type']
> = EventByType<EVENT | ObservableBuiltInEvent<T>, TYPE> extends {
	data: infer DATA;
}
	? DATA
	: undefined;

export type Observer<
	T,
	EVENT extends ObservableEventBase,
	TYPE extends EVENT['type'] | ObservableBuiltInEvent<T>['type'] =
		| EVENT['type']
		| ObservableBuiltInEvent<T>['type']
> = (data: ObservableEventData<T, EVENT, TYPE>) => void;

export type UnsubscribeFn = () => void;

type OOOO = Observer<{ a: string }, { type: 'aaa'; data: string }, 'aaa'>;
type OOOO1 = Observer<{ a: string }, { type: 'aaa'; data: string }>;

type ZZZ0 = ObservableEventData<{ a: string }, never, 'add'>;

type ZZZ0111 = EventByType<
	{ type: 'aaa'; data: string } | ObservableBuiltInEvent<{ test: string }>,
	'add'
>;

type ZZZ1 = ObservableEventData<
	{ a: string },
	{ type: 'ZZZ'; data: number },
	'add'
>;
type ZZZ2 = ObservableEventData<
	{ a: string },
	{ type: 'ZZZ'; data: number },
	'ZZZ'
>;
type ZZZ3 = ObservableEventData<{ a: string }, { type: 'ZZZ'; data: number }>;
