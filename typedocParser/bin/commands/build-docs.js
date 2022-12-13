"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDocs = void 0;
const colorette_spinner_1 = require("@favware/colorette-spinner");
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const exec = (0, node_util_1.promisify)(node_child_process_1.exec);
async function buildDocs(options) {
    const spinner = new colorette_spinner_1.Spinner().start({ text: 'Building TypeDoc documentation' });
    try {
        await exec(`typedoc --json ${options.json}`);
    }
    catch (error) {
        const cause = error;
        if (options.verbose) {
            spinner.error({ text: 'Failed to build TypeDoc documentation' });
            console.log(cause.stack ?? cause.message);
        }
        else
            spinner.error({ text: 'Failed to build TypeDoc documentation. Add the --verbose flag to view these errors.' });
        process.exit(1);
    }
    spinner.success({ text: 'Successfully built TypeDoc documentation' });
}
exports.buildDocs = buildDocs;
//# sourceMappingURL=build-docs.js.map