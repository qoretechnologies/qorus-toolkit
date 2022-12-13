"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TupleTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a tuple type.
 * @since 1.0.0
 */
class TupleTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Tuple
        });
        /**
         * The types of this tuple type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "types", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { types } = data;
        this.types = types;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            types: this.types.map((type) => type.toJSON())
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return TupleTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser, project } = options;
        return `[${parser.types.map((type) => type.toString(project)).join(', ')}]`;
    }
}
exports.TupleTypeParser = TupleTypeParser;
//# sourceMappingURL=TupleTypeParser.js.map