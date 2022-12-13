"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRepository = void 0;
const colorette_spinner_1 = require("@favware/colorette-spinner");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
async function checkRepository(options) {
    const spinner = new colorette_spinner_1.Spinner().start({ text: 'Checking if "package.json" exists in the current working directory' });
    const packageJsonExists = (0, node_fs_1.existsSync)((0, node_path_1.resolve)(process.cwd(), 'package.json'));
    if (!packageJsonExists) {
        spinner.error({ text: 'Could not find "package.json" in the current working directory. Are you sure this is a Node.js repository?' });
        if (options.verbose)
            console.log('I detected this current working directory: ', process.cwd());
        process.exit(1);
    }
    spinner.success({ text: 'Found "package.json" in the current working directory' });
    return Promise.resolve();
}
exports.checkRepository = checkRepository;
//# sourceMappingURL=check-repository.js.map