"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnionTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a union type.
 * @since 1.0.0
 */
class UnionTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Union
        });
        /**
         * The types of this union type.
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
        return UnionTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser } = options;
        return parser.types.map((type) => TypeParser_1.TypeParser.wrap(type, TypeParser_1.TypeParser.BindingPowers[TypeParser_1.TypeParser.Kind.Union])).join(' | ');
    }
}
exports.UnionTypeParser = UnionTypeParser;
//# sourceMappingURL=UnionTypeParser.js.map