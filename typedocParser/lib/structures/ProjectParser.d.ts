import type { JSONOutput } from 'typedoc';
import { SearchResult } from '../types';
import { ClassParser } from './class-parser/';
import { EnumParser } from './enum-parser';
import { FunctionParser } from './FunctionParser';
import { InterfaceParser } from './interface-parser';
import { NamespaceParser } from './NamespaceParser';
import { TypeAliasParser } from './TypeAliasParser';
import { VariableParser } from './VariableParser';
/**
 * Parses data from `JSONOutput.ProjectReflection` or {@link ProjectParser.Json}
 * @since 1.0.0
 */
export declare class ProjectParser {
    /**
     * The version of `typedoc-json-parser` used to generate this project.
     * @since 1.0.0
     */
    readonly typeDocJsonParserVersion: string;
    /**
     * The identifier of this project. This is usually `0`
     * @since 1.0.0
     */
    readonly id: number;
    /**
     * The name of your project.
     *
     * Corresponds to the `name` property in your TypeDoc configuration or the `name` property of your `package.json` file.
     * @since 1.0.0
     */
    readonly name: string;
    /**
     * The version of the project being parsed.
     *
     * Corresponds to the `version` property in your `package.json`
     * @since 2.2.0
     */
    readonly version: string | null;
    /**
     * The readme content of this project.
     * @since 3.0.0
     */
    readonly readme: string | null;
    /**
     * The changelog of this project.
     * @since 3.2.0
     */
    changelog: string | null;
    /**
     * An array of class parsers for this project.
     * @since 1.0.0
     */
    readonly classes: ClassParser[];
    /**
     * An array of enum parsers for this project.
     * @since 1.0.0
     */
    readonly enums: EnumParser[];
    /**
     * An array of function parsers for this project.
     * @since 1.0.0
     */
    readonly functions: FunctionParser[];
    /**
     * An array of interface parsers for this project.
     * @since 1.0.0
     */
    readonly interfaces: InterfaceParser[];
    /**
     * An array of namespace parsers for this project.
     * @since 1.0.0
     */
    readonly namespaces: NamespaceParser[];
    /**
     * An array of type alias parsers for this project.
     * @since 1.0.0
     */
    readonly typeAliases: TypeAliasParser[];
    /**
     * An array of variable parsers for this project.
     * @since 1.0.0
     */
    readonly variables: VariableParser[];
    constructor(options: ProjectParser.Options);
    /**
     * Find a parser by id.
     * @since 3.0.0
     * @param id The id of the parser to find.
     * @returns The parser with the given id, or `null` if none was found.
     */
    find(id: number): SearchResult | null;
    /**
     * Search for a parser with a given query.
     * @since 3.0.0
     * @param query The query to search with.
     * @returns An array of search results.
     */
    search(query: string): SearchResult[];
    /**
     * Converts this project to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this project.
     */
    toJSON(): ProjectParser.Json;
    static version: string;
}
export declare namespace ProjectParser {
    interface Options {
        /**
         * The data for this project.
         * @since 3.0.0
         */
        data: Json | JSONOutput.ProjectReflection;
        /**
         * The version of the project being parsed.
         * @since 3.0.0
         */
        version?: string;
        /**
         * The readme content of this project.
         * @since 3.0.0
         */
        readme?: string;
        /**
         * The changelog content of this project.
         * @since 3.2.0
         */
        changelog?: string;
    }
    interface Json {
        /**
         * The version of `typedoc-json-parser` that generated this Json object.
         * @since 2.1.0
         */
        typeDocJsonParserVersion: string;
        /**
         * The identifier of this project. This is usually `0`
         * @since 1.0.0
         */
        id: number;
        /**
         * The name of your project.
         *
         * Corresponds to the `name` property in your TypeDoc configuration or the `name` property of your `package.json` file.
         * @since 1.0.0
         */
        name: string;
        /**
         * The version of the project being parsed.
         *
         * Corresponds to the `version` property in your `package.json`
         * @since 2.2.0
         */
        version: string | null;
        /**
         * The readme content of this project.
         * @since 3.0.0
         */
        readme: string | null;
        /**
         * The changelog content of this project.
         * @since 3.2.0
         */
        changelog: string | null;
        /**
         * An array of class Json compatible objects for this project in a Json compatible format.
         * @since 1.0.0
         */
        classes: ClassParser.Json[];
        /**
         * An array of enum Json compatible objects for this project in a Json compatible format.
         * @since 1.0.0
         */
        enums: EnumParser.Json[];
        /**
         * An array of function Json compatible objects for this project in a Json compatible format.
         * @since 1.0.0
         */
        functions: FunctionParser.Json[];
        /**
         * An array of interface Json compatible objects for this project in a Json compatible format.
         * @since 1.0.0
         */
        interfaces: InterfaceParser.Json[];
        /**
         * An array of namespace Json compatible objects for this project in a Json compatible format.
         * @since 1.0.0
         */
        namespaces: NamespaceParser.Json[];
        /**
         * An array of type alias Json compatible objects for this project in a Json compatible format.
         * @since 1.0.0
         */
        typeAliases: TypeAliasParser.Json[];
        /**
         * An array of variable Json compatible objects for this project in a Json compatible format.
         * @since 1.0.0
         */
        variables: VariableParser.Json[];
    }
}
//# sourceMappingURL=ProjectParser.d.ts.map