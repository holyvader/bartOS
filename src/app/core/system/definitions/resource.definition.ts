import { ArgsObject } from '@system/utils/args/args.definition';

export type ResourceDefinition = TextFile | Folder | UserProgram;
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

export interface UserProgram extends Resource {
	type: 'up';
	content: unknown;
}

export interface Folder extends Resource {
	type: 'dir';
}

export interface ResourceArgs extends ArgsObject {
	rid: ResourceDefinition['rid'];
	path: ResourceDefinition['path'];
	name: ResourceDefinition['name'];
	type: ResourceDefinition['type'];
}
