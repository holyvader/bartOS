export class StoreService<T extends object> {
	private store = new Map<string, T>();

	constructor(private keyName: KeysMatchingString<T> & string) {}

	set(item: T) {
		this.store.set(item[this.keyName] as string, item);
	}

	setMany(items: T[]) {
		items.forEach((it) => {
			this.set(it);
		});
	}

	getAll(): IterableIterator<T> {
		return this.store.values();
	}

	getByKey(id: string): T | undefined {
		return this.store.get(id);
	}
}
