"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntersectionTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for an intersection type.
 * @since 1.0.0
 */
class IntersectionTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Intersection
        });
        /**
         * The types of this intersection type.
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
        return IntersectionTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser } = options;
        return parser.types.map((type) => TypeParser_1.TypeParser.wrap(type, TypeParser_1.TypeParser.BindingPowers[TypeParser_1.TypeParser.Kind.Intersection])).join(' & ');
    }
}
exports.IntersectionTypeParser = IntersectionTypeParser;
//# sourceMappingURL=IntersectionTypeParser.js.map