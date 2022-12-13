/// <reference types="node" />
import type { PathLike } from 'node:fs';
/**
 * Parsed a YAML file into an `Object` of type `T`
 * @param pathLike The {@link PathLike} to read with {@link readFile}
 */
export declare function readYaml<T>(pathLike: PathLike): Promise<T>;
//# sourceMappingURL=readYaml.d.ts.map