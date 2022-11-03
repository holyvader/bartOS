export type ResourceDefinition = TextFile | Folder;
export type ResourceType = ResourceDefinition['type'];
export type Separator = '/';
export type PathPart = `${Separator}${string}`;
export type ResourcePath =
	| `${PathPart}`
	| `${PathPart}${PathPart}`
	| `${PathPart}${PathPart}${PathPart}`
	| `${PathPart}${PathPart}${PathPart}${PathPart}`
	| `${PathPart}${PathPart}${PathPart}${PathPart}${PathPart}`;
export type RID = `r-${string}`;

interface Resource {
	rid: RID;
	path: ResourcePath;
	name: string;
}

export interface TextFile extends Resource {
	type: 'txt';
	content: string;
}

export interface Folder extends Resource {
	type: 'dir';
}
