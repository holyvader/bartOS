interface WithChildren { children: any }

type ExtractParams<COMPONENT extends (...params: any[]) => any> = Parameters<COMPONENT> extends (infer T)[] ? T : never;
