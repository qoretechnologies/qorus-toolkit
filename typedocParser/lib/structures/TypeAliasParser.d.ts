import type { JSONOutput } from 'typedoc';
import { CommentParser, TypeParameterParser } from './misc/';
import { Parser } from './Parser';
import { TypeParser } from './type-parsers';
/**
 * Parses data from a type alias reflection.
 * @since 1.0.0
 */
export declare class TypeAliasParser extends Parser {
    /**
     * The comment parser of this type alias.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * Whether this type alias is external.
     * @since 1.0.0
     */
    readonly external: boolean;
    /**
     * The type parameters of this type alias.
     * @since 1.0.0
     */
    readonly typeParameters: TypeParameterParser[];
    /**
     * The type of this type alias.
     * @since 1.0.0
     */
    readonly type: TypeParser;
    constructor(data: TypeAliasParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): TypeAliasParser.Json;
    /**
     * Generates a new {@link TypeAliasParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection): TypeAliasParser;
    /**
     * Generates a new {@link TypeAliasParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: TypeAliasParser.Json): TypeAliasParser;
}
export declare namespace TypeAliasParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this type alias.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * Whether this type alias is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The type parameters of this type alias.
         * @since 1.0.0
         */
        typeParameters: TypeParameterParser[];
        /**
         * The type of this type alias.
         * @since 1.0.0
         */
        type: TypeParser;
    }
    interface Json extends Parser.Json {
        /**
         * The comment parser of this type alias.
         * @since 1.0.0
         */
        comment: CommentParser.Json;
        /**
         * Whether this type alias is external.
         * @since 1.0.0
         */
        external: boolean;
        /**
         * The type parameters of this type alias in a Json compatible format.
         * @since 1.0.0
         */
        typeParameters: TypeParameterParser.Json[];
        /**
         * The type of this type alias in a Json compatible format.
         */
        type: TypeParser.Json;
    }
}
//# sourceMappingURL=TypeAliasParser.d.ts.map