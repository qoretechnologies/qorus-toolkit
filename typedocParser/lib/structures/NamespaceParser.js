"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceParser = void 0;
const types_1 = require("../types");
const class_parser_1 = require("./class-parser/");
const enum_parser_1 = require("./enum-parser");
const FunctionParser_1 = require("./FunctionParser");
const interface_parser_1 = require("./interface-parser");
const misc_1 = require("./misc");
const Parser_1 = require("./Parser");
const TypeAliasParser_1 = require("./TypeAliasParser");
const VariableParser_1 = require("./VariableParser");
/**
 * Parses data from a namespace reflection.
 * @since 1.0.0
 */
class NamespaceParser extends Parser_1.Parser {
    constructor(data) {
        super(data);
        /**
         * The comment parser of this namespace.
         * @since 1.0.0
         */
        Object.defineProperty(this, "comment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this namespace is external.
         * @since 1.0.0
         */
        Object.defineProperty(this, "external", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The class parsers of this namespace.
         * @since 1.0.0
         */
        Object.defineProperty(this, "classes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The enum parsers of this namespace.
         * @since 1.0.0
         */
        Object.defineProperty(this, "enums", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The function parsers of this namespace.
         * @since 1.0.0
         */
        Object.defineProperty(this, "functions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The interface parsers of this namespace.
         * @since 1.0.0
         */
        Object.defineProperty(this, "interfaces", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The namespace parsers of this namespace.
         * @since 1.0.0
         */
        Object.defineProperty(this, "namespaces", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type alias parsers of this namespace.
         * @since 1.0.0
         */
        Object.defineProperty(this, "typeAliases", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The variable parsers of this namespace.
         * @since 1.0.0
         */
        Object.defineProperty(this, "variables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { comment, external, classes, enums, functions, interfaces, namespaces, typeAliases, variables } = data;
        this.comment = comment;
        this.external = external;
        this.classes = classes;
        this.enums = enums;
        this.functions = functions;
        this.interfaces = interfaces;
        this.namespaces = namespaces;
        this.typeAliases = typeAliases;
        this.variables = variables;
    }
    /**
     * Find a parser by id.
     * @since 3.0.0
     * @param id The id of the parser to find.
     * @returns The parser with the given id, or `null` if none was found.
     */
    find(id) {
        for (const classParser of this.classes) {
            if (classParser.id === id)
                return classParser;
            if (classParser.construct.id === id)
                return classParser.construct;
            for (const methodParser of classParser.methods) {
                if (methodParser.id === id)
                    return methodParser;
                for (const signature of methodParser.signatures) {
                    if (signature.id === id)
                        return signature;
                    for (const typeParameter of signature.typeParameters)
                        if (typeParameter.id === id)
                            return typeParameter;
                    for (const parameter of signature.parameters)
                        if (parameter.id === id)
                            return parameter;
                }
            }
            for (const propertyParser of classParser.properties)
                if (propertyParser.id === id)
                    return propertyParser;
        }
        for (const enumParser of this.enums) {
            if (enumParser.id === id)
                return enumParser;
            for (const propertyParser of enumParser.members)
                if (propertyParser.id === id)
                    return propertyParser;
        }
        for (const functionParser of this.functions)
            if (functionParser.id === id)
                return functionParser;
        for (const interfaceParser of this.interfaces) {
            if (interfaceParser.id === id)
                return interfaceParser;
            for (const propertyParser of interfaceParser.properties)
                if (propertyParser.id === id)
                    return propertyParser;
        }
        for (const namespaceParser of this.namespaces) {
            if (namespaceParser.id === id)
                return namespaceParser;
            const found = namespaceParser.find(id);
            if (found)
                return found;
        }
        for (const typeAliasParser of this.typeAliases)
            if (typeAliasParser.id === id)
                return typeAliasParser;
        for (const variableParser of this.variables)
            if (variableParser.id === id)
                return variableParser;
        return null;
    }
    /**
     * Search for a parser with a given query.
     * @since 3.0.0
     * @param query The query to search with.
     * @returns An array of search results.
     */
    search(query) {
        const results = [];
        const words = query
            .toLowerCase()
            .split(/(#|\.)/g)
            .filter((word) => word !== '.' && word !== '#');
        for (const classParser of this.classes) {
            if (classParser.name.toLowerCase().includes(words[0])) {
                if (words.length === 1) {
                    results.push(classParser);
                    continue;
                }
                for (const methodParser of classParser.methods) {
                    if (methodParser.name.toLowerCase().includes(words[1])) {
                        if (words.length === 2) {
                            results.push(methodParser);
                            continue;
                        }
                    }
                }
                for (const propertyParser of classParser.properties) {
                    if (propertyParser.name.toLowerCase().includes(words[1])) {
                        results.push(propertyParser);
                        continue;
                    }
                }
            }
        }
        for (const enumParser of this.enums) {
            if (enumParser.name.toLowerCase().includes(words[0])) {
                if (words.length === 1) {
                    results.push(enumParser);
                    continue;
                }
                for (const enumMemberParser of enumParser.members) {
                    if (enumMemberParser.name.toLowerCase().includes(words[1])) {
                        results.push(enumMemberParser);
                        continue;
                    }
                }
            }
        }
        for (const functionParser of this.functions) {
            if (functionParser.name.toLowerCase().includes(words[0])) {
                results.push(functionParser);
                continue;
            }
        }
        for (const interfaceParser of this.interfaces) {
            if (interfaceParser.name.toLowerCase().includes(words[0])) {
                if (words.length === 1) {
                    results.push(interfaceParser);
                    continue;
                }
                for (const propertyParser of interfaceParser.properties) {
                    if (propertyParser.name.toLowerCase().includes(words[1])) {
                        results.push(propertyParser);
                        continue;
                    }
                }
            }
        }
        for (const namespaceParser of this.namespaces) {
            if (namespaceParser.name.toLowerCase().includes(words[0])) {
                if (words.length === 1) {
                    results.push(namespaceParser);
                    continue;
                }
                const subResults = namespaceParser.search(query.substring(words[0].length));
                for (const subResult of subResults)
                    results.push(subResult);
            }
        }
        for (const typeAliasParser of this.typeAliases) {
            if (typeAliasParser.name.toLowerCase().includes(words[0])) {
                results.push(typeAliasParser);
                continue;
            }
        }
        for (const variableParser of this.variables) {
            if (variableParser.name.toLowerCase().includes(words[0])) {
                results.push(variableParser);
                continue;
            }
        }
        return results;
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format.
     */
    toJSON() {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            external: this.external,
            classes: this.classes.map((parser) => parser.toJSON()),
            enums: this.enums.map((parser) => parser.toJSON()),
            functions: this.functions.map((parser) => parser.toJSON()),
            interfaces: this.interfaces.map((parser) => parser.toJSON()),
            namespaces: this.namespaces.map((parser) => parser.toJSON()),
            typeAliases: this.typeAliases.map((parser) => parser.toJSON()),
            variables: this.variables.map((parser) => parser.toJSON())
        };
    }
    /**
     * Generates a new {@link NamespaceParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection) {
        const { kind, kindString = 'Unknown', id, name, comment = { summary: [] }, sources = [], flags, children = [] } = reflection;
        if (kind !== types_1.ReflectionKind.Namespace)
            throw new Error(`Expected Namespace (${types_1.ReflectionKind.Namespace}), but received ${kindString} (${kind})`);
        const classes = children.filter((child) => child.kind === types_1.ReflectionKind.Class).map((child) => class_parser_1.ClassParser.generateFromTypeDoc(child));
        const enums = children.filter((child) => child.kind === types_1.ReflectionKind.Enum).map((child) => enum_parser_1.EnumParser.generateFromTypeDoc(child));
        const functions = children.filter((child) => child.kind === types_1.ReflectionKind.Function).map((child) => FunctionParser_1.FunctionParser.generateFromTypeDoc(child));
        const interfaces = children.filter((child) => child.kind === types_1.ReflectionKind.Interface).map((child) => interface_parser_1.InterfaceParser.generateFromTypeDoc(child));
        const namespaces = children.filter((child) => child.kind === types_1.ReflectionKind.Namespace).map((child) => NamespaceParser.generateFromTypeDoc(child));
        const typeAliases = children
            .filter((child) => child.kind === types_1.ReflectionKind.TypeAlias)
            .map((child) => TypeAliasParser_1.TypeAliasParser.generateFromTypeDoc(child));
        const variables = children.filter((child) => child.kind === types_1.ReflectionKind.Variable).map((child) => VariableParser_1.VariableParser.generateFromTypeDoc(child));
        return new NamespaceParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromTypeDoc(comment),
            source: sources.length ? misc_1.SourceParser.generateFromTypeDoc(sources[0]) : null,
            external: Boolean(flags.isExternal),
            classes,
            enums,
            functions,
            interfaces,
            namespaces,
            typeAliases,
            variables
        });
    }
    /**
     * Generates a new {@link NamespaceParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { id, name, comment, source, external, classes, variables, enums, functions, interfaces, namespaces, typeAliases } = json;
        return new NamespaceParser({
            id,
            name,
            comment: misc_1.CommentParser.generateFromJson(comment),
            source: source ? misc_1.SourceParser.generateFromJson(source) : null,
            external,
            classes: classes.map((json) => class_parser_1.ClassParser.generateFromJson(json)),
            enums: enums.map((json) => enum_parser_1.EnumParser.generateFromJson(json)),
            functions: functions.map((json) => FunctionParser_1.FunctionParser.generateFromJson(json)),
            interfaces: interfaces.map((json) => interface_parser_1.InterfaceParser.generateFromJson(json)),
            namespaces: namespaces.map((json) => NamespaceParser.generateFromJson(json)),
            typeAliases: typeAliases.map((json) => TypeAliasParser_1.TypeAliasParser.generateFromJson(json)),
            variables: variables.map((json) => VariableParser_1.VariableParser.generateFromJson(json))
        });
    }
}
exports.NamespaceParser = NamespaceParser;
//# sourceMappingURL=NamespaceParser.js.map