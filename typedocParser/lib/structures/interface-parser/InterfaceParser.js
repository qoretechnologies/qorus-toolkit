"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceParser = void 0;
const types_1 = require("../../types");
const misc_1 = require("../misc");
const Parser_1 = require("../Parser");
const InterfaceMethodParser_1 = require("./InterfaceMethodParser");
const InterfacePropertyParser_1 = require("./InterfacePropertyParser");
/**
 * Parses data from an interface reflection.
 * @since 1.0.0
 */
class InterfaceParser extends Parser_1.Parser {
    constructor(data) {
        super(data);
        /**
         * The comment parser of this interface.
         * @since 1.0.0
         */
        Object.defineProperty(this, "comment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this interface is external.
         * @since 1.0.0
         */
        Object.defineProperty(this, "external", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type parameters of this interface.
         * @since 7.0.0
         */
        Object.defineProperty(this, "typeParameters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The property parsers of this interface.
         * @since 1.0.0
         */
        Object.defineProperty(this, "properties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The method parsers of this interface.
         * @since 3.1.0
         */
        Object.defineProperty(this, "methods", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { comment, external, typeParameters, properties, methods } = data;
        this.comment = comment;
        this.external = external;
        this.typeParameters = typeParameters;
        this.properties = properties;
        this.methods = methods;
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
            properties: this.properties.map((parser) => parser.toJSON()),
            methods: this.methods.map((parser) => parser.toJSON())
        };
    }
    /**
     * Generates a new {@link InterfaceParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, sources = [], flags, typeParameters = [], children = [] } = reflection;
        if (kind !== types_1.ReflectionKind.Interface)
            throw new Error(`Expected Interface (${types_1.ReflectionKind.Interface}), but received ${kindString} (${kind})`);
        const properties = children
            .filter((child) => child.kind === types_1.ReflectionKind.Property)
            .map((child) => InterfacePropertyParser_1.InterfacePropertyParser.generateFromTypeDoc(child, id));
        const methods = children
            .filter((child) => child.kind === types_1.ReflectionKind.Method)
            .map((child) => InterfaceMethodParser_1.InterfaceMethodParser.generateFromTypeDoc(child, id));
        return new InterfaceParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromTypeDoc(comment),
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            external: Boolean(flags.isExternal),
            typeParameters: typeParameters.map((typeParameter) => misc_1.TypeParameterParser.generateFromTypeDoc(typeParameter)),
            properties,
            methods
        });
    }
    /**
     * Generates a new {@link InterfaceParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, source, external, typeParameters, properties, methods } = json;
        return new InterfaceParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromJson(comment),
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            external,
            typeParameters: typeParameters.map((typeParameter) => misc_1.TypeParameterParser.generateFromJson(typeParameter)),
            properties: properties.map((parser) => InterfacePropertyParser_1.InterfacePropertyParser.generateFromJson(parser)),
            methods: methods.map((parser) => InterfaceMethodParser_1.InterfaceMethodParser.generateFromJson(parser))
        });
    }
}
exports.InterfaceParser = InterfaceParser;
//# sourceMappingURL=InterfaceParser.js.map