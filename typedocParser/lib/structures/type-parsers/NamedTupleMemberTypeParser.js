"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamedTupleMemberTypeParser = void 0;
const TypeParser_1 = require("./TypeParser");
/**
 * Parses data for a named tuple member.
 * @since 1.0.0
 */
class NamedTupleMemberTypeParser {
    constructor(data) {
        /**
         * The name of this named tuple member.
         * @since 1.0.0
         */
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: TypeParser_1.TypeParser.Kind.NamedTupleMember
        });
        /**
         * The name of this named tuple member.
         * @since 1.0.0
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of this named tuple member.
         * @since 1.0.0
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this named tuple member is optional.
         * @since 1.0.0
         */
        Object.defineProperty(this, "optional", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { name, type, optional } = data;
        this.name = name;
        this.type = type;
        this.optional = optional;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            kind: this.kind,
            name: this.name,
            type: this.type.toJSON(),
            optional: this.optional
        };
    }
    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    toString(project) {
        return NamedTupleMemberTypeParser.formatToString({ parser: this, project });
    }
    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    static formatToString(options) {
        const { parser, project } = options;
        return `${parser.name}${parser.optional ? '?' : ''}: ${parser.type.toString(project)}`;
    }
}
exports.NamedTupleMemberTypeParser = NamedTupleMemberTypeParser;
//# sourceMappingURL=NamedTupleMemberTypeParser.js.map