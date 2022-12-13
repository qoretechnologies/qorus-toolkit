import type { JSONOutput } from 'typedoc';
import { CommentParser } from '../misc';
import { Parser } from '../Parser';
/**
 * Parses data from an enum property reflection.
 * @since 1.0.0
 */
export declare class EnumMemberParser extends Parser {
    /**
     * The comment parser of this property.
     * @since 1.0.0
     */
    readonly comment: CommentParser;
    /**
     * The id of the parent enum parser.
     * @since 4.0.0
     */
    readonly parentId: number;
    /**
     * The value of this enum property.
     * @since 1.0.0
     */
    readonly value: string;
    constructor(data: EnumMemberParser.Data);
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): EnumMemberParser.Json;
    /**
     * Generates a new {@link EnumMemberParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(reflection: JSONOutput.DeclarationReflection, parentId: number): EnumMemberParser;
    /**
     * Generates a new {@link EnumMemberParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: EnumMemberParser.Json): EnumMemberParser;
}
export declare namespace EnumMemberParser {
    interface Data extends Parser.Data {
        /**
         * The comment parser of this property.
         * @since 1.0.0
         */
        comment: CommentParser;
        /**
         * The id of the parent enum parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * The value of this enum property.
         * @since 1.0.0
         */
        value: string;
    }
    interface Json extends Parser.Json {
        /**
         * The comment parser of this property.
         * @since 1.0.0
         */
        comment: CommentParser.Json;
        /**
         * The id of the parent enum parser.
         * @since 4.0.0
         */
        parentId: number;
        /**
         * The value of this enum property.
         * @since 1.0.0
         */
        value: string;
    }
}
//# sourceMappingURL=EnumMemberParser.d.ts.map