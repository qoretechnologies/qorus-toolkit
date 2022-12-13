/// <reference types="node" />
import type { PathLike } from 'node:fs';
/**
 * Parses a JSON file into an `Object` of type `T`
 * @param pathLike The {@link PathLike} to read with {@link readFile}
 */
export declare function readJson<T>(pathLike: PathLike): Promise<T>;
//# sourceMappingURL=readJson.d.ts.map