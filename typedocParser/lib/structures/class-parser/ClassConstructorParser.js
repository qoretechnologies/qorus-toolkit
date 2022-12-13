"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassConstructorParser = void 0;
const types_1 = require("../../types");
const misc_1 = require("../misc");
const Parser_1 = require("../Parser");
const ClassParser_1 = require("./ClassParser");
class ClassConstructorParser extends Parser_1.Parser {
    constructor(data) {
        super(data);
        /**
         * The comment parser of this constructor.
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
         * The accessibility of this constructor.
         * @since 7.0.0
         */
        Object.defineProperty(this, "accessibility", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The parameter parsers of this constructor.
         * @since 1.0.0
         */
        Object.defineProperty(this, "parameters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { comment, parentId, accessibility, parameters } = data;
        this.comment = comment;
        this.parentId = parentId;
        this.accessibility = accessibility;
        this.parameters = parameters;
    }
    /**
     * Whether or not this constructor has a public accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPublic() {
        return this.accessibility === ClassParser_1.ClassParser.Accessibility.Public;
    }
    /**
     * Whether or not this constructor has a protected accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isProtected() {
        return this.accessibility === ClassParser_1.ClassParser.Accessibility.Protected;
    }
    /**
     * Whether or not this constructor has a private accessibility.
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
            parameters: this.parameters.map((parameter) => parameter.toJSON())
        };
    }
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection, parentId) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, sources = [], flags, signatures = [] } = reflection;
        if (kind !== types_1.ReflectionKind.Constructor) {
            throw new Error(`Expected Constructor (${types_1.ReflectionKind.Constructor}), but received ${kindString} (${kind})`);
        }
        const signature = signatures.find((signature) => signature.kind === types_1.ReflectionKind.ConstructorSignature);
        if (signature === undefined)
            throw new Error(`Expected Constructor (${types_1.ReflectionKind.Constructor}) with a signature, but there was none`);
        const { parameters = [] } = signature;
        return new ClassConstructorParser({
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
            parameters: parameters.map((parameter) => misc_1.ParameterParser.generateFromTypeDoc(parameter))
        });
    }
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, source, parentId, accessibility, parameters } = json;
        return new ClassConstructorParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromJson(comment),
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            parentId,
            accessibility,
            parameters: parameters.map((parameter) => misc_1.ParameterParser.generateFromJson(parameter))
        });
    }
}
exports.ClassConstructorParser = ClassConstructorParser;
//# sourceMappingURL=ClassConstructorParser.js.map