"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readYaml = void 0;
const js_yaml_1 = require("js-yaml");
const promises_1 = require("node:fs/promises");
/**
 * Parsed a YAML file into an `Object` of type `T`
 * @param pathLike The {@link PathLike} to read with {@link readFile}
 */
async function readYaml(pathLike) {
    return (0, js_yaml_1.load)(await (0, promises_1.readFile)(pathLike, { encoding: 'utf-8' }));
}
exports.readYaml = readYaml;
//# sourceMappingURL=readYaml.js.map