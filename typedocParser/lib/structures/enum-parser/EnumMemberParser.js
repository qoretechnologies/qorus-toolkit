"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumMemberParser = void 0;
const types_1 = require("../../types");
const misc_1 = require("../misc");
const Parser_1 = require("../Parser");
const type_parsers_1 = require("../type-parsers");
/**
 * Parses data from an enum property reflection.
 * @since 1.0.0
 */
class EnumMemberParser extends Parser_1.Parser {
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
         * The id of the parent enum parser.
         * @since 4.0.0
         */
        Object.defineProperty(this, "parentId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The value of this enum property.
         * @since 1.0.0
         */
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { comment, parentId, value } = data;
        this.comment = comment;
        this.parentId = parentId;
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
            parentId: this.parentId,
            value: this.value
        };
    }
    /**
     * Generates a new {@link EnumMemberParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection, parentId) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, sources = [], type } = reflection;
        if (kind !== types_1.ReflectionKind.EnumMember) {
            throw new Error(`Expected EnumMember (${types_1.ReflectionKind.EnumMember}), but received ${kindString} (${kind})`);
        }
        return new EnumMemberParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromTypeDoc(comment),
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            parentId,
            value: type_parsers_1.TypeParser.generateFromTypeDoc(type).toString()
        });
    }
    /**
     * Generates a new {@link EnumMemberParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, source, parentId, value } = json;
        return new EnumMemberParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromJson(comment),
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            parentId,
            value
        });
    }
}
exports.EnumMemberParser = EnumMemberParser;
//# sourceMappingURL=EnumMemberParser.js.map