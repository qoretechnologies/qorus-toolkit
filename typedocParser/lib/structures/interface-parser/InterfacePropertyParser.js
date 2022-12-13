"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfacePropertyParser = void 0;
const types_1 = require("../../types");
const misc_1 = require("../misc");
const Parser_1 = require("../Parser");
const type_parsers_1 = require("../type-parsers");
/**
 * Parses data from an interface property reflection.
 * @since 1.0.0
 */
class InterfacePropertyParser extends Parser_1.Parser {
    constructor(data) {
        super(data);
        /**
         * The comment parser of this property.
         * @since 1.0.0
         */
        Object.defineProperty(this, "comment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The id of the parent interface parser.
         * @since 4.0.0
         */
        Object.defineProperty(this, "parentId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this interface property is readonly.
         * @since 1.0.0
         */
        Object.defineProperty(this, "readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of this property.
         * @since 1.0.0
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { comment, parentId, readonly, type } = data;
        this.comment = comment;
        this.parentId = parentId;
        this.readonly = readonly;
        this.type = type;
    }
    /**
     * Converts this parser to a JSON compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            parentId: this.parentId,
            readonly: this.readonly,
            type: this.type.toJSON()
        };
    }
    /**
     * Generates a new {@link InterfacePropertyParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection, parentId) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, sources = [], type, flags } = reflection;
        if (kind !== types_1.ReflectionKind.Property)
            throw new Error(`Expected Property (${types_1.ReflectionKind.Property}), but received ${kindString} (${kind})`);
        return new InterfacePropertyParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromTypeDoc(comment),
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            parentId,
            readonly: Boolean(flags.isReadonly),
            type: type_parsers_1.TypeParser.generateFromTypeDoc(type)
        });
    }
    /**
     * Generates a new {@link InterfacePropertyParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, source, parentId, readonly, type } = json;
        return new InterfacePropertyParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromJson(comment),
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            parentId,
            readonly,
            type: type_parsers_1.TypeParser.generateFromJson(type)
        });
    }
}
exports.InterfacePropertyParser = InterfacePropertyParser;
//# sourceMappingURL=InterfacePropertyParser.js.map