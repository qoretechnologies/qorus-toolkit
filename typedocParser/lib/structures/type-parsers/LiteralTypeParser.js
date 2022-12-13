"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteralTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a literal type.
 * @since 1.0.0
 */
class LiteralTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Literal
        });
        /**
         * The value of this literal type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { value } = data;
        this.value = value;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            value: this.value
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return LiteralTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser } = options;
        return parser.value;
    }
}
exports.LiteralTypeParser = LiteralTypeParser;
//# sourceMappingURL=LiteralTypeParser.js.map