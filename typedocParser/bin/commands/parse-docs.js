"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDocs = void 0;
const colorette_spinner_1 = require("@favware/colorette-spinner");
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const ProjectParser_1 = require("../../lib/structures/ProjectParser");
async function parseDocs(options) {
    const spinner = new colorette_spinner_1.Spinner().start({ text: 'Parsing TypeDoc JSON output file' });
    try {
        const { version } = JSON.parse(await (0, promises_1.readFile)((0, node_path_1.resolve)(process.cwd(), 'package.json'), 'utf8'));
        const readme = (0, node_fs_1.existsSync)((0, node_path_1.resolve)(process.cwd(), 'README.md')) ? await (0, promises_1.readFile)((0, node_path_1.resolve)(process.cwd(), 'README.md'), 'utf8') : undefined;
        const changelog = (0, node_fs_1.existsSync)((0, node_path_1.resolve)(process.cwd(), 'CHANGELOG.md')) ? await (0, promises_1.readFile)((0, node_path_1.resolve)(process.cwd(), 'CHANGELOG.md'), 'utf8') : undefined;
        const data = JSON.parse(await (0, promises_1.readFile)((0, node_path_1.resolve)(process.cwd(), options.json), 'utf-8'));
        const parsed = new ProjectParser_1.ProjectParser({ data, version, readme, changelog }).toJSON();
        await (0, promises_1.writeFile)((0, node_path_1.resolve)(process.cwd(), options.json), JSON.stringify(parsed, null, 2));
        spinner.success({ text: 'Parsed TypeDoc JSON output file' });
    }
    catch (error) {
        const cause = error;
        if (options.verbose) {
            spinner.error({ text: 'Failed to parse TypeDoc JSON output file.' });
            console.log(cause.stack ?? cause.message);
        }
        else
            spinner.error({ text: 'Failed to parse TypeDoc JSON output file. Add the --verbose flag to view these errors.' });
        process.exit(1);
    }
}
exports.parseDocs = parseDocs;
//# sourceMappingURL=parse-docs.js.map