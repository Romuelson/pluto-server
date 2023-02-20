export type TObjectMap<T extends string | number | symbol, K> = { [key in T]: K };
