"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredicateTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a predicate type.
 * @since 1.0.0
 */
class PredicateTypeParser {
    constructor(data) {
        /**
         * The kind of type this parser is for.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.Predicate
        });
        /**
         * Whether this predicate type asserts a value.
         * @since 1.0.0
         */
        Object.defineProperty(this, "asserts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The name of this predicate type.
         * @since 1.0.0
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of this predicate type.
         *
         * If this {@link PredicateTypeParser.asserts} is `false` this will not be `null`
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { asserts, name, type } = data;
        this.asserts = asserts;
        this.name = name;
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
            asserts: this.asserts,
            name: this.name,
            type: this.type ? this.type.toJSON() : null
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return PredicateTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser, project } = options;
        return parser.asserts ? `asserts ${parser.name}` : `${parser.name} is ${parser.type.toString(project)}`;
    }
}
exports.PredicateTypeParser = PredicateTypeParser;
//# sourceMappingURL=PredicateTypeParser.js.map