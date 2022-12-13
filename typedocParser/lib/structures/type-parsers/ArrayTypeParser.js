"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for an array type.
 * @since 1.0.0
 */
class ArrayTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Array
        });
        /**
         * The type of this array type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { type } = data;
        this.type = type;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            type: this.type.toJSON()
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @param project The project to convert this parser to a string.
     * @returns The string representation of this parser.
     */
    toString(project) {
        return ArrayTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser } = options;
        return `${TypeParser_1.TypeParser.wrap(parser.type, TypeParser_1.TypeParser.BindingPowers[TypeParser_1.TypeParser.Kind.Array])}[]`;
    }
}
exports.ArrayTypeParser = ArrayTypeParser;
//# sourceMappingURL=ArrayTypeParser.js.map