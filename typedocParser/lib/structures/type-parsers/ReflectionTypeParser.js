"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectionTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a reflection type.
 * @since 1.0.0
 */
class ReflectionTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Reflection
        });
        /**
         * The reflection of this reflection type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "reflection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { reflection } = data;
        this.reflection = reflection;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            reflection: this.reflection
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return ReflectionTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser } = options;
        return !parser.reflection?.children && parser.reflection?.signatures ? 'Function' : 'Object';
    }
}
exports.ReflectionTypeParser = ReflectionTypeParser;
//# sourceMappingURL=ReflectionTypeParser.js.map