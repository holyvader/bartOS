export type ResourceDefinition = TextFile;
export type ResourceType = ResourceDefinition['type'];

type PathPart = `/${string}`;
export type ResourcePath = `<home>${PathPart}`;
export type RID = `r-${string}`;

interface Resource {
	rid: RID;
	path: ResourcePath;
	name: string;
}

interface TextFile extends Resource {
	type: 'txt';
	content: string;
}
