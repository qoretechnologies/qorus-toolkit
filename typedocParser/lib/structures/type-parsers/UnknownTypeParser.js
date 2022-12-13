"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for an unknown type.
 * @since 1.0.0
 */
class UnknownTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Unknown
        });
        /**
         * The name of this unknown type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { name } = data;
        this.name = name;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            name: this.name
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return UnknownTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser } = options;
        return parser.name;
    }
}
exports.UnknownTypeParser = UnknownTypeParser;
//# sourceMappingURL=UnknownTypeParser.js.map