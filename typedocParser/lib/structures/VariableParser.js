"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableParser = void 0;
const types_1 = require("../types");
const misc_1 = require("./misc");
const Parser_1 = require("./Parser");
const type_parsers_1 = require("./type-parsers");
/**
 * Parses data from a variable reflection.
 * @since 1.0.0
 */
class VariableParser extends Parser_1.Parser {
    constructor(data) {
        super(data);
        /**
         * The comment parser of this variable.
         * @since 1.0.0
         */
        Object.defineProperty(this, "comment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this variable is external.
         * @since 1.0.0
         */
        Object.defineProperty(this, "external", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of this variable.
         * @since 1.0.0
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The value of this variable.
         * @since 1.0.0
         */
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { comment, external, type, value } = data;
        this.comment = comment;
        this.external = external;
        this.type = type;
        this.value = value;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            external: this.external,
            type: this.type.toJSON(),
            value: this.value
        };
    }
    /**
     * Generates a new {@link VariableParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @param  The  this parser belongs to.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, sources = [], flags, type, defaultValue } = reflection;
        if (kind !== types_1.ReflectionKind.Variable)
            throw new Error(`Expected Variable (${types_1.ReflectionKind.Variable}), but received ${kindString} (${kind})`);
        return new VariableParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromTypeDoc(comment),
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            external: Boolean(flags.isExternal),
            type: type_parsers_1.TypeParser.generateFromTypeDoc(type),
            value: defaultValue
        });
    }
    /**
     * Generates a new {@link VariableParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, source, external, type, value } = json;
        return new VariableParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromJson(comment),
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            external,
            type: type_parsers_1.TypeParser.generateFromJson(type),
            value
        });
    }
}
exports.VariableParser = VariableParser;
//# sourceMappingURL=VariableParser.js.map