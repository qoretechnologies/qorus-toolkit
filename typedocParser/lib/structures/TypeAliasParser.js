"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAliasParser = void 0;
const types_1 = require("../types");
const misc_1 = require("./misc/");
const Parser_1 = require("./Parser");
const type_parsers_1 = require("./type-parsers");
/**
 * Parses data from a type alias reflection.
 * @since 1.0.0
 */
class TypeAliasParser extends Parser_1.Parser {
    constructor(data) {
        super(data);
        /**
         * The comment parser of this type alias.
         * @since 1.0.0
         */
        Object.defineProperty(this, "comment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this type alias is external.
         * @since 1.0.0
         */
        Object.defineProperty(this, "external", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type parameters of this type alias.
         * @since 1.0.0
         */
        Object.defineProperty(this, "typeParameters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of this type alias.
         * @since 1.0.0
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { comment, external, typeParameters, type } = data;
        this.comment = comment;
        this.external = external;
        this.typeParameters = typeParameters;
        this.type = type;
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
            typeParameters: this.typeParameters.map((typeParameter) => typeParameter.toJSON()),
            type: this.type.toJSON()
        };
    }
    /**
     * Generates a new {@link TypeAliasParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, sources = [], flags, type, typeParameters = [] } = reflection;
        if (kind !== types_1.ReflectionKind.TypeAlias)
            throw new Error(`Expected TypeAlias (${types_1.ReflectionKind.TypeAlias}), but received ${kindString} (${kind})`);
        return new TypeAliasParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromTypeDoc(comment),
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            external: Boolean(flags.isExternal),
            typeParameters: typeParameters.map((typeParameter) => misc_1.TypeParameterParser.generateFromTypeDoc(typeParameter)),
            type: type_parsers_1.TypeParser.generateFromTypeDoc(type)
        });
    }
    /**
     * Generates a new {@link TypeAliasParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, source, external, typeParameters, type } = json;
        return new TypeAliasParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromJson(comment),
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            external,
            typeParameters: typeParameters.map((typeParameter) => misc_1.TypeParameterParser.generateFromJson(typeParameter)),
            type: type_parsers_1.TypeParser.generateFromJson(type)
        });
    }
}
exports.TypeAliasParser = TypeAliasParser;
//# sourceMappingURL=TypeAliasParser.js.map