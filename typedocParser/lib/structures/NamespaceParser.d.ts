import type { JSONOutput } from 'typedoc';
import { SearchResult } from '../types';
import { ClassParser } from './class-parser/';
import { EnumParser } from './enum-parser';
import { FunctionParser } from './FunctionParser';
import { InterfaceParser } from './interface-parser';
import { CommentParser } from './misc';
import { Parser } from './Parser';
import { TypeAliasParser } from './TypeAliasParser';
import { VariableParser } from './VariableParser';
/**
 * Parses data from a namespace reflection.
 * @since 1.0.0
 */
export declare class NamespaceParser extends Parser {
    /**
     * The comment parser of this namespace.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * Whether this namespace is external.
     * @since 1.0.0
     */
    readonly external: boolean;
    /**
     * The class parsers of this namespace.
     * @since 1.0.0
     */
    readonly classes: ClassParser[];
    /**
     * The enum parsers of this namespace.
     * @since 1.0.0
     */
    readonly enums: EnumParser[];
    /**
     * The function parsers of this namespace.
     * @since 1.0.0
     */
    readonly functions: FunctionParser[];
    /**
     * The interface parsers of this namespace.
     * @since 1.0.0
     */
    readonly interfaces: InterfaceParser[];
    /**
     * The namespace parsers of this namespace.
     * @since 1.0.0
     */
    readonly namespaces: NamespaceParser[];
    /**
     * The type alias parsers of this namespace.
     * @since 1.0.0
     */
    readonly typeAliases: TypeAliasParser[];
    /**
     * The variable parsers of this namespace.
     * @since 1.0.0
     */
    readonly variables: VariableParser[];
    constructor(data: NamespaceParser.Data);
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
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format.
     */
    toJSON(): NamespaceParser.Json;
    /**
     * Generates a new {@link NamespaceParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection): NamespaceParser;
    /**
     * Generates a new {@link NamespaceParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: NamespaceParser.Json): NamespaceParser;
}
export declare namespace NamespaceParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this namespace.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * Whether this namespace is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The class parsers of this namespace.
         * @since 1.0.0
         */
        classes: ClassParser[];
        /**
         * The enum parsers of this namespace.
         * @since 1.0.0
         */
        enums: EnumParser[];
        /**
         * The function parsers of this namespace.
         * @since 1.0.0
         */
        functions: FunctionParser[];
        /**
         * The interface parsers of this namespace.
         * @since 1.0.0
         */
        interfaces: InterfaceParser[];
        /**
         * The namespace parsers of this namespace.
         * @since 1.0.0
         */
        namespaces: NamespaceParser[];
        /**
         * The type alias parsers of this namespace.
         * @since 1.0.0
         */
        typeAliases: TypeAliasParser[];
        /**
         * The variable parsers of this namespace.
         * @since 1.0.0
         */
        variables: VariableParser[];
    }
    interface Json extends Parser.Json {
        /**
         * The comment parser of this namespace.
         * @since 1.0.0
         */
        comment: CommentParser.Json;
        /**
         * Whether this namespace is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The class parsers of this namespace in a Json compatible format.
         * @since 1.0.0
         */
        classes: ClassParser.Json[];
        /**
         * The enum parsers of this namespace in a Json compatible format.
         * @since 1.0.0
         */
        enums: EnumParser.Json[];
        /**
         * The function parsers of this namespace in a Json compatible format.
         * @since 1.0.0
         */
        functions: FunctionParser.Json[];
        /**
         * The interface parsers of this namespace in a Json compatible format.
         * @since 1.0.0
         */
        interfaces: InterfaceParser.Json[];
        /**
         * The namespace parsers of this namespace in a Json compatible format.
         * @since 1.0.0
         */
        namespaces: Json[];
        /**
         * The type alias parsers of this namespace in a Json compatible format.
         * @since 1.0.0
         */
        typeAliases: TypeAliasParser.Json[];
        /**
         * The variable parsers of this namespace in a Json compatible format.
         * @since 1.0.0
         */
        variables: VariableParser.Json[];
    }
}
//# sourceMappingURL=NamespaceParser.d.ts.map