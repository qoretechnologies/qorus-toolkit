"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassMethodParser = void 0;
const types_1 = require("../../types");
const misc_1 = require("../misc");
const Parser_1 = require("../Parser");
const ClassParser_1 = require("./ClassParser");
/**
 * Parses data from a class method reflection.
 * @since 1.0.0
 */
class ClassMethodParser extends Parser_1.Parser {
    constructor(data) {
        super(data);
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
         * The accessibility of this method.
         * @since 1.0.0
         */
        Object.defineProperty(this, "accessibility", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this method is abstract.
         * @since 1.0.0
         */
        Object.defineProperty(this, "abstract", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this method is static.
         * @since 1.0.0
         */
        Object.defineProperty(this, "static", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The signature parsers of this method.
         * @since 1.0.0
         */
        Object.defineProperty(this, "signatures", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { parentId, accessibility, abstract, static: _static, signatures } = data;
        this.parentId = parentId;
        this.accessibility = accessibility;
        this.abstract = abstract;
        this.static = _static;
        this.signatures = signatures;
    }
    /**
     * Whether or not this method has a public accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPublic() {
        return this.accessibility === ClassParser_1.ClassParser.Accessibility.Public;
    }
    /**
     * Whether or not this method has a protected accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isProtected() {
        return this.accessibility === ClassParser_1.ClassParser.Accessibility.Protected;
    }
    /**
     * Whether or not this method has a private accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    isPrivate() {
        return this.accessibility === ClassParser_1.ClassParser.Accessibility.Private;
    }
    /**
     * Convert this parser to a JSON compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            ...super.toJSON(),
            parentId: this.parentId,
            accessibility: this.accessibility,
            abstract: this.abstract,
            static: this.static,
            signatures: this.signatures.map((signature) => signature.toJSON())
        };
    }
    /**
     * Generates a new {@link ClassMethodParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection, parentId) {
        const { kind, kindString = 'Unknown', id, name, sources = [], flags, signatures = [] } = reflection;
        if (kind !== types_1.ReflectionKind.Method)
            throw new Error(`Expected Method (${types_1.ReflectionKind.Method}), but received ${kindString} (${kind})`);
        return new ClassMethodParser({
            id,
            name,
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            parentId,
            accessibility: flags.isPrivate
                ? ClassParser_1.ClassParser.Accessibility.Private
                : flags.isProtected
                    ? ClassParser_1.ClassParser.Accessibility.Protected
                    : ClassParser_1.ClassParser.Accessibility.Public,
            abstract: Boolean(flags.isAbstract),
            static: Boolean(flags.isStatic),
            signatures: signatures.map((signature) => misc_1.SignatureParser.generateFromTypeDoc(signature))
        });
    }
    /**
     * Generates a new {@link ClassMethodParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, source, parentId, accessibility, abstract, static: _static, signatures } = json;
        return new ClassMethodParser({
            id,
            name,
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            parentId,
            accessibility,
            abstract,
            static: _static,
            signatures: signatures.map((signature) => misc_1.SignatureParser.generateFromJson(signature))
        });
    }
}
exports.ClassMethodParser = ClassMethodParser;
//# sourceMappingURL=ClassMethodParser.js.map