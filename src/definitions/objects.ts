type KeysMatching<T, V> = {
	[P in keyof T]-?: T[P] extends V ? P : never;
}[keyof T];

type KeysMatchingString<T> = KeysMatching<T, string>;
