"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceParser = void 0;
const node_path_1 = require("node:path");
/**
 * Parses data from a source reflection.
 * @since 1.0.0
 */
class SourceParser {
    constructor(data) {
        /**
         * The line number of this source.
         * @since 1.0.0
         */
        Object.defineProperty(this, "line", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The file name of this source.
         * @since 1.0.0
         */
        Object.defineProperty(this, "file", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The path of this source.
         * @since 1.0.0
         */
        Object.defineProperty(this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The url of this source.
         * @since 2.4.0
         */
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { line, file, path, url } = data;
        this.line = line;
        this.file = file;
        this.path = path;
        this.url = url;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            line: this.line,
            file: this.file,
            path: this.path,
            url: this.url
        };
    }
    /**
     * Generates a new {@link SourceParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection) {
        const { line, fileName, url } = reflection;
        return new SourceParser({
            line,
            file: (0, node_path_1.basename)(fileName),
            path: (0, node_path_1.dirname)(fileName),
            url: url ?? null
        });
    }
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { line, file, path, url } = json;
        return new SourceParser({
            line,
            file,
            path,
            url
        });
    }
}
exports.SourceParser = SourceParser;
//# sourceMappingURL=SourceParser.js.map