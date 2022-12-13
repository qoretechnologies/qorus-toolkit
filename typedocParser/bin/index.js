#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorette_1 = require("colorette");
const commander_1 = require("commander");
const build_docs_1 = require("./commands/build-docs");
const check_repository_1 = require("./commands/check-repository");
const migrate_docs_1 = require("./commands/migrate-docs");
const parse_docs_1 = require("./commands/parse-docs");
const parseOptions_1 = require("./lib/parseOptions");
async function run() {
    const command = new commander_1.Command()
        .option('--json [path]', 'Path to the TypeDoc JSON output file to parse')
        .option('--migrate [path]', 'Path to the directory containing TypeDoc JSON Parser output files to migrate')
        .option('-v, --verbose', 'Print verbose information', false);
    const program = command.parse(process.argv);
    const options = await (0, parseOptions_1.parseOptions)(program.opts());
    if (options.verbose)
        console.log(`Resolved Options:`, options);
    if (!Reflect.has(options, 'json') && !Reflect.has(options, 'migrate')) {
        console.error((0, colorette_1.red)(`${(0, colorette_1.bold)('[ERROR]')} You must specify either the --json or --migrate option`));
    }
    // Check if the current working directory is a Node.js repository.
    await (0, check_repository_1.checkRepository)(options);
    if (options.migrate) {
        await (0, migrate_docs_1.migrateDocs)(options);
    }
    else if (options.json) {
        // Build the TypeDoc documentation.
        await (0, build_docs_1.buildDocs)(options);
        // Parse the TypeDoc JSON output.
        await (0, parse_docs_1.parseDocs)(options);
    }
}
void run();
//# sourceMappingURL=index.js.map