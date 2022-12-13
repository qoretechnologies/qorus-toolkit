"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJson = void 0;
const promises_1 = require("node:fs/promises");
/**
 * Parses a JSON file into an `Object` of type `T`
 * @param pathLike The {@link PathLike} to read with {@link readFile}
 */
async function readJson(pathLike) {
    return JSON.parse(await (0, promises_1.readFile)(pathLike, { encoding: 'utf-8' }));
}
exports.readJson = readJson;
//# sourceMappingURL=readJson.js.map