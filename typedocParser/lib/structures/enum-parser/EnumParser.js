"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumParser = void 0;
const types_1 = require("../../types");
const misc_1 = require("../misc");
const Parser_1 = require("../Parser");
const EnumMemberParser_1 = require("./EnumMemberParser");
/**
 * Parses data from an enum reflection.
 * @since 1.0.0
 */
class EnumParser extends Parser_1.Parser {
    constructor(data) {
        super(data);
        /**
         * The comment parser of this enum.
         * @since 1.0.0
         */
        Object.defineProperty(this, "comment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this enum is external.
         * @since 1.0.0
         */
        Object.defineProperty(this, "external", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The property parsers of this enum.
         * @since 1.0.0
         */
        Object.defineProperty(this, "members", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { comment, external, members } = data;
        this.comment = comment;
        this.external = external;
        this.members = members;
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
            members: this.members
        };
    }
    /**
     * Generates a new {@link EnumParser} instance from the given Json data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, sources = [], flags, children = [] } = reflection;
        if (kind !== types_1.ReflectionKind.Enum)
            throw new Error(`Expected Enum (${types_1.ReflectionKind.Enum}), but received ${kindString} (${kind})`);
        const members = children
            .filter((child) => child.kind === types_1.ReflectionKind.EnumMember)
            .map((child) => EnumMemberParser_1.EnumMemberParser.generateFromTypeDoc(child, id));
        return new EnumParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromTypeDoc(comment),
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            external: Boolean(flags.isExternal),
            members
        });
    }
    /**
     * Generates a new {@link EnumParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, source, external, members } = json;
        return new EnumParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromJson(comment),
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            external,
            members: members.map((property) => EnumMemberParser_1.EnumMemberParser.generateFromJson(property))
        });
    }
}
exports.EnumParser = EnumParser;
//# sourceMappingURL=EnumParser.js.map