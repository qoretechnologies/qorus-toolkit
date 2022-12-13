"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedocJsonParserRcYamlPath = exports.typedocJsonParserRcYmlPath = exports.typedocJsonParserRcJsonPath = exports.typedocJsonParserRcPath = void 0;
const node_path_1 = require("node:path");
exports.typedocJsonParserRcPath = (0, node_path_1.join)(process.cwd(), '.typedoc-json-parserrc');
exports.typedocJsonParserRcJsonPath = `${exports.typedocJsonParserRcPath}.json`;
exports.typedocJsonParserRcYmlPath = `${exports.typedocJsonParserRcPath}.yml`;
exports.typedocJsonParserRcYamlPath = `${exports.typedocJsonParserRcPath}.yaml`;
//# sourceMappingURL=constants.js.map