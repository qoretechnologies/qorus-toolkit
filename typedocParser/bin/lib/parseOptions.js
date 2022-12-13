"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOptions = exports.typedocJsonParserRcYamlPath = exports.typedocJsonParserRcYmlPath = exports.typedocJsonParserRcJsonPath = exports.typedocJsonParserRcPath = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const readJson_1 = require("./readJson");
const readYaml_1 = require("./readYaml");
exports.typedocJsonParserRcPath = (0, node_path_1.join)(process.cwd(), '.typedoc-json-parserrc');
exports.typedocJsonParserRcJsonPath = `${exports.typedocJsonParserRcPath}.json`;
exports.typedocJsonParserRcYmlPath = `${exports.typedocJsonParserRcPath}.yml`;
exports.typedocJsonParserRcYamlPath = `${exports.typedocJsonParserRcPath}.yaml`;
async function parseOptions(options) {
    const typedocJsonParserRcExists = (0, node_fs_1.existsSync)(exports.typedocJsonParserRcPath);
    const typedocJsonParserRcJsonExists = (0, node_fs_1.existsSync)(exports.typedocJsonParserRcJsonPath);
    const typedocJsonParserRcYmlExists = (0, node_fs_1.existsSync)(exports.typedocJsonParserRcYmlPath);
    const typedocJsonParserRcYamlExists = (0, node_fs_1.existsSync)(exports.typedocJsonParserRcYamlPath);
    if (typedocJsonParserRcYmlExists || typedocJsonParserRcYamlExists) {
        try {
            options = { ...(await (0, readYaml_1.readYaml)(typedocJsonParserRcYmlExists ? exports.typedocJsonParserRcYmlPath : exports.typedocJsonParserRcYamlPath)), ...options };
        }
        catch (error) {
            const cause = error;
            console.log('Failed to parse yaml config file');
            if (options.verbose)
                console.log(cause.stack ?? cause.message);
            process.exit(1);
        }
    }
    else if (typedocJsonParserRcExists || typedocJsonParserRcJsonExists) {
        try {
            options = { ...(await (0, readJson_1.readJson)(typedocJsonParserRcExists ? exports.typedocJsonParserRcPath : exports.typedocJsonParserRcJsonPath)), ...options };
        }
        catch (error) {
            const cause = error;
            console.log('Failed to parse json config file');
            if (options.verbose)
                console.log(cause.stack ?? cause.message);
            process.exit(1);
        }
    }
    return options;
}
exports.parseOptions = parseOptions;
//# sourceMappingURL=parseOptions.js.map