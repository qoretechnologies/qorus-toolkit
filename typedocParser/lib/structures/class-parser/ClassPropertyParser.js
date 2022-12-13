"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassPropertyParser = void 0;
const types_1 = require("../../types");
const misc_1 = require("../misc");
const Parser_1 = require("../Parser");
const type_parsers_1 = require("../type-parsers");
const ClassParser_1 = require("./ClassParser");
/**
 * Parses data from a class property reflection.
 * @since 1.0.0
 */
class ClassPropertyParser extends Parser_1.Parser {
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
         * The id of the parent class parser.
         * @since 4.0.0
         */
        Object.defineProperty(this, "parentId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The accessibility of this property.
         * @since 1.0.0
         */
        Object.defineProperty(this, "accessibility", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this property is abstract.
         * @since 1.0.0
         */
        Object.defineProperty(this, "abstract", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this property is static.
         * @since 1.0.0
         */
        Object.defineProperty(this, "static", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this property is readonly.
         * @since 1.0.0
         */
        Object.defineProperty(this, "readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this property is optional.
         * @since 1.0.0
         */
        Object.defineProperty(this, "optional", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type parser of this property.
         * @since 1.0.0
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { comment, parentId, accessibility, abstract, static: _static, readonly, optional, type } = data;
        this.comment = comment;
        this.parentId = parentId;
        this.accessibility = accessibility;
        this.abstract = abstract;
        this.static = _static;
        this.readonly = readonly;
        this.optional = optional;
        this.type = type;
    }
    /**
     * Whether or not this property has a public accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPublic() {
        return this.accessibility === ClassParser_1.ClassParser.Accessibility.Public;
    }
    /**
     * Whether or not this property has a protected accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isProtected() {
        return this.accessibility === ClassParser_1.ClassParser.Accessibility.Protected;
    }
    /**
     * Whether or not this property has a private accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPrivate() {
        return this.accessibility === ClassParser_1.ClassParser.Accessibility.Private;
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
            accessibility: this.accessibility,
            abstract: this.abstract,
            static: this.static,
            readonly: this.readonly,
            optional: this.optional,
            type: this.type.toJSON()
        };
    }
    /**
     * Generates a new {@link ClassPropertyParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection, parentId) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, sources = [], type, flags, getSignature } = reflection;
        if (kind !== types_1.ReflectionKind.Property && kind !== types_1.ReflectionKind.Accessor) {
            throw new Error(`Expected Property (${types_1.ReflectionKind.Property}) or Accessor (${types_1.ReflectionKind.Accessor}), but received ${kindString} (${kind})`);
        }
        if (kind === types_1.ReflectionKind.Accessor) {
            if (getSignature === undefined)
                throw new Error(`Expected Accessor (${types_1.ReflectionKind.Accessor}) with a getter, but there was none`);
            const { id, name, comment = { summary: [] }, type, flags } = getSignature;
            return new ClassPropertyParser({
                id,
                name,
                comment: misc_1.CommentParser.generateFromTypeDoc(comment),
                source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
                parentId,
                accessibility: flags.isPrivate
                    ? ClassParser_1.ClassParser.Accessibility.Private
                    : flags.isProtected
                        ? ClassParser_1.ClassParser.Accessibility.Protected
                        : ClassParser_1.ClassParser.Accessibility.Public,
                abstract: Boolean(flags.isAbstract),
                static: Boolean(flags.isStatic),
                readonly: Boolean(flags.isReadonly),
                optional: Boolean(flags.isOptional),
                type: type_parsers_1.TypeParser.generateFromTypeDoc(type)
            });
        }
        return new ClassPropertyParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromTypeDoc(comment),
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            parentId,
            accessibility: flags.isPrivate
                ? ClassParser_1.ClassParser.Accessibility.Private
                : flags.isProtected
                    ? ClassParser_1.ClassParser.Accessibility.Protected
                    : ClassParser_1.ClassParser.Accessibility.Public,
            abstract: Boolean(flags.isAbstract),
            static: Boolean(flags.isStatic),
            readonly: Boolean(flags.isReadonly),
            optional: Boolean(flags.isOptional),
            type: type_parsers_1.TypeParser.generateFromTypeDoc(type)
        });
    }
    /**
     * Generates a new {@link ClassPropertyParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, source, parentId, accessibility, abstract, static: _static, readonly, optional, type } = json;
        return new ClassPropertyParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromJson(comment),
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            parentId,
            accessibility,
            abstract,
            static: _static,
            readonly,
            optional,
            type: type_parsers_1.TypeParser.generateFromJson(type)
        });
    }
}
exports.ClassPropertyParser = ClassPropertyParser;
//# sourceMappingURL=ClassPropertyParser.js.map