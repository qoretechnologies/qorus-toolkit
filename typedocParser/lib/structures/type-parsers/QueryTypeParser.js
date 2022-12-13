"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a query type.
 * @since 1.0.0
 */
class QueryTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Query
        });
        /**
         * The query of this query type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "query", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { query } = data;
        this.query = query;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            query: this.query.toJSON()
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return QueryTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser, project } = options;
        return `typeof ${parser.query.toString(project)}`;
    }
}
exports.QueryTypeParser = QueryTypeParser;
//# sourceMappingURL=QueryTypeParser.js.map