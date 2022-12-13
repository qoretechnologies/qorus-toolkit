"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateDocs = void 0;
const colorette_spinner_1 = require("@favware/colorette-spinner");
const node_utilities_1 = require("@sapphire/node-utilities");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const migrateProjectJson_1 = require("../lib/migrateProjectJson");
async function migrateDocs(options) {
    const spinner = new colorette_spinner_1.Spinner().start({ text: 'Migrating TypeDoc JSON Parser output files' });
    try {
        const directory = (0, node_path_1.resolve)(process.cwd(), options.migrate);
        let migratedFiles = 0;
        const warnings = [];
        for await (const path of (0, node_utilities_1.findFilesRecursivelyStringEndsWith)(directory, '.json')) {
            const data = JSON.parse(await (0, promises_1.readFile)(path, 'utf-8'));
            if ('typeDocJsonParserVersion' in data) {
                const migrated = (0, migrateProjectJson_1.migrateProjectJson)(data);
                if (typeof migrated === 'string') {
                    warnings.push(migrated);
                }
                else {
                    await (0, promises_1.writeFile)(path, JSON.stringify(migrated, null, 2), 'utf-8');
                    migratedFiles++;
                }
            }
        }
        spinner.success({ text: `Migrated ${migratedFiles} TypeDoc JSON Parser output files` });
        for (const warning of warnings)
            console.warn(warning);
    }
    catch (error) {
        const cause = error;
        spinner.error({ text: 'Failed to migrate TypeDoc JSON Parser output' });
        if (options.verbose)
            console.log(cause.stack ?? cause.message);
        process.exit(1);
    }
}
exports.migrateDocs = migrateDocs;
//# sourceMappingURL=migrate-docs.js.map