"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectParser = void 0;
const colorette_1 = require("colorette");
const types_1 = require("../types");
const class_parser_1 = require("./class-parser/");
const enum_parser_1 = require("./enum-parser");
const FunctionParser_1 = require("./FunctionParser");
const interface_parser_1 = require("./interface-parser");
const NamespaceParser_1 = require("./NamespaceParser");
const TypeAliasParser_1 = require("./TypeAliasParser");
const VariableParser_1 = require("./VariableParser");
/**
 * Parses data from `JSONOutput.ProjectReflection` or {@link ProjectParser.Json}
 * @since 1.0.0
 */
class ProjectParser {
    constructor(options) {
        /**
         * The version of `typedoc-json-parser` used to generate this project.
         * @since 1.0.0
         */
        Object.defineProperty(this, "typeDocJsonParserVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ProjectParser.version
        });
        /**
         * The identifier of this project. This is usually `0`
         * @since 1.0.0
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The name of your project.
         *
         * Corresponds to the `name` property in your TypeDoc configuration or the `name` property of your `package.json` file.
         * @since 1.0.0
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The version of the project being parsed.
         *
         * Corresponds to the `version` property in your `package.json`
         * @since 2.2.0
         */
        Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The readme content of this project.
         * @since 3.0.0
         */
        Object.defineProperty(this, "readme", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The changelog of this project.
         * @since 3.2.0
         */
        Object.defineProperty(this, "changelog", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * An array of class parsers for this project.
         * @since 1.0.0
         */
        Object.defineProperty(this, "classes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * An array of enum parsers for this project.
         * @since 1.0.0
         */
        Object.defineProperty(this, "enums", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * An array of function parsers for this project.
         * @since 1.0.0
         */
        Object.defineProperty(this, "functions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * An array of interface parsers for this project.
         * @since 1.0.0
         */
        Object.defineProperty(this, "interfaces", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * An array of namespace parsers for this project.
         * @since 1.0.0
         */
        Object.defineProperty(this, "namespaces", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * An array of type alias parsers for this project.
         * @since 1.0.0
         */
        Object.defineProperty(this, "typeAliases", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * An array of variable parsers for this project.
         * @since 1.0.0
         */
        Object.defineProperty(this, "variables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { data, version, readme, changelog } = options;
        const { id, name } = data;
        this.id = id;
        this.name = name;
        if ('classes' in data) {
            const { typeDocJsonParserVersion, classes, enums, functions, interfaces, namespaces, typeAliases, variables } = data;
            const incomingTypeDocVersion = typeDocJsonParserVersion.split('.').map(Number);
            const currentTypeDocVersion = this.typeDocJsonParserVersion.split('.').map(Number);
            if (incomingTypeDocVersion[0] !== currentTypeDocVersion[0]) {
                console.warn((0, colorette_1.red)(`${(0, colorette_1.bold)('[WARNING]')} typedoc-json-parser major version mismatch. Expected ${currentTypeDocVersion[0]}, but received ${incomingTypeDocVersion[0]}`));
            }
            else if (incomingTypeDocVersion[1] !== currentTypeDocVersion[1]) {
                console.warn((0, colorette_1.yellow)(`${(0, colorette_1.bold)('[WARNING]')} typedoc-json-parser minor version mismatch. Expected ${currentTypeDocVersion[1]}, but received ${incomingTypeDocVersion[1]}`));
            }
            else if (incomingTypeDocVersion[2] !== currentTypeDocVersion[2]) {
                console.warn((0, colorette_1.yellow)(`${(0, colorette_1.bold)('[WARNING]')} typedoc-json-parser patch version mismatch. Expected ${currentTypeDocVersion[2]}, but received ${incomingTypeDocVersion[2]}`));
            }
            this.typeDocJsonParserVersion = typeDocJsonParserVersion;
            this.version = version ?? data.version;
            this.readme = readme ?? data.readme;
            this.changelog = changelog ?? data.changelog;
            this.classes = classes.map((json) => class_parser_1.ClassParser.generateFromJson(json));
            this.enums = enums.map((json) => enum_parser_1.EnumParser.generateFromJson(json));
            this.functions = functions.map((json) => FunctionParser_1.FunctionParser.generateFromJson(json));
            this.interfaces = interfaces.map((json) => interface_parser_1.InterfaceParser.generateFromJson(json));
            this.namespaces = namespaces.map((json) => NamespaceParser_1.NamespaceParser.generateFromJson(json));
            this.typeAliases = typeAliases.map((json) => TypeAliasParser_1.TypeAliasParser.generateFromJson(json));
            this.variables = variables.map((json) => VariableParser_1.VariableParser.generateFromJson(json));
        }
        else {
            const { kind, kindString = 'Unknown', children = [] } = data;
            if (kind !== types_1.ReflectionKind.Project)
                throw new Error(`Expected Project (${types_1.ReflectionKind.Project}), but received ${kindString} (${kind})`);
            this.version = version ?? null;
            this.readme = readme ?? null;
            this.changelog = changelog ?? null;
            this.classes = children.filter((child) => child.kind === types_1.ReflectionKind.Class).map((child) => class_parser_1.ClassParser.generateFromTypeDoc(child));
            this.enums = children.filter((child) => child.kind === types_1.ReflectionKind.Enum).map((child) => enum_parser_1.EnumParser.generateFromTypeDoc(child));
            this.functions = children.filter((child) => child.kind === types_1.ReflectionKind.Function).map((child) => FunctionParser_1.FunctionParser.generateFromTypeDoc(child));
            this.interfaces = children
                .filter((child) => child.kind === types_1.ReflectionKind.Interface)
                .map((child) => interface_parser_1.InterfaceParser.generateFromTypeDoc(child));
            this.namespaces = children
                .filter((child) => child.kind === types_1.ReflectionKind.Namespace)
                .map((child) => NamespaceParser_1.NamespaceParser.generateFromTypeDoc(child));
            this.typeAliases = children
                .filter((child) => child.kind === types_1.ReflectionKind.TypeAlias)
                .map((child) => TypeAliasParser_1.TypeAliasParser.generateFromTypeDoc(child));
            this.variables = children.filter((child) => child.kind === types_1.ReflectionKind.Variable).map((child) => VariableParser_1.VariableParser.generateFromTypeDoc(child));
        }
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
     * Converts this project to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this project.
     */
    toJSON() {
        return {
            typeDocJsonParserVersion: this.typeDocJsonParserVersion,
            id: this.id,
            name: this.name,
            version: this.version,
            readme: this.readme,
            changelog: this.changelog,
            classes: this.classes.map((parser) => parser.toJSON()),
            enums: this.enums.map((parser) => parser.toJSON()),
            functions: this.functions.map((parser) => parser.toJSON()),
            interfaces: this.interfaces.map((parser) => parser.toJSON()),
            namespaces: this.namespaces.map((parser) => parser.toJSON()),
            typeAliases: this.typeAliases.map((parser) => parser.toJSON()),
            variables: this.variables.map((parser) => parser.toJSON())
        };
    }
}
exports.ProjectParser = ProjectParser;
Object.defineProperty(ProjectParser, "version", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: '7.0.2'
});
//# sourceMappingURL=ProjectParser.js.map